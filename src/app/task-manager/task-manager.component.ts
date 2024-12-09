import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  deleteDoc,
  addDoc,
  query,
  orderBy,
  FirestoreDataConverter,
} from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Define a interface Task
interface Task {
  id?: string;
  title: string;
  description: string;
  dueDate: string;
  cpf: string;
  email: string;
  name: string;
  status: string;
}

// Conversor para transformar os dados do Firestore para a interface Task
const taskConverter: FirestoreDataConverter<Task> = {
  toFirestore(task: Task): any {
    return { ...task }; // Converte o objeto Task para o formato do Firestore
  },
  fromFirestore(snapshot: any): Task {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      title: data['title'],
      description: data['description'],
      dueDate: data['dueDate'],
      cpf: data['cpf'],
      email: data['email'],
      name: data['name'],
      status: data['status'],
    };
  },
};

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class TaskManagerComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = {
    title: '',
    description: '',
    dueDate: '',
    cpf: '',
    email: '',
    name: '',
    status: 'pendente',
  };

  constructor(private firestore: Firestore, private auth: Auth) {}

  ngOnInit() {
    const tasksCollection = collection(this.firestore, 'tasks').withConverter(
      taskConverter
    ); // Adiciona o conversor
    const q = query(tasksCollection, orderBy('dueDate'));

    collectionData(q, { idField: 'id' }).subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks; // Agora o TypeScript entende que tasks é um array de Task
      },
      (error: any) => {
        console.error('Erro ao carregar as tarefas:', error);
      }
    );
  }

  addTask() {
    const tasksCollection = collection(this.firestore, 'tasks').withConverter(
      taskConverter
    );
    addDoc(tasksCollection, this.newTask)
      .then((docRef) => {
        alert('Tarefa adicionada com sucesso!');
        this.tasks.push({ ...this.newTask, id: docRef.id });
        this.resetForm();
      })
      .catch((error) => console.error('Erro ao adicionar tarefa:', error));
  }

  deleteTask(taskId: string | undefined) {
    if (!taskId) {
      console.error('ID da tarefa não encontrado.');
      return;
    }

    const taskDoc = doc(this.firestore, `tasks/${taskId}`).withConverter(
      taskConverter
    );
    deleteDoc(taskDoc)
      .then(() => {
        alert('Tarefa excluída com sucesso!');
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      })
      .catch((error) => console.error('Erro ao excluir tarefa:', error));
  }

  resetForm() {
    this.newTask = {
      title: '',
      description: '',
      dueDate: '',
      cpf: '',
      email: '',
      name: '',
      status: 'pendente',
    };
  }

  logout() {
    this.auth.signOut().then(() => {
      window.location.href = '/login';
    });
  }
}
