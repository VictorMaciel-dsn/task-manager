import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  deleteDoc,
  addDoc,
  updateDoc,
  query,
  orderBy,
  FirestoreDataConverter,
} from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

const taskConverter: FirestoreDataConverter<Task> = {
  toFirestore(task: Task): any {
    return { ...task };
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
  isEditing: boolean = false;
  editingTaskId?: string;

  constructor(private firestore: Firestore, private auth: Auth) {}

  ngOnInit() {
    const tasksCollection = collection(this.firestore, 'tasks').withConverter(
      taskConverter
    );
    const q = query(tasksCollection, orderBy('dueDate'));

    collectionData(q, { idField: 'id' }).subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      },
      (error: any) => {
        console.error('Erro ao carregar as tarefas:', error);
      }
    );
  }

  onSubmit() {
    if (this.isEditing && this.editingTaskId) {
      this.updateTask();
    } else {
      this.addTask();
    }
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

  editTask(task: Task) {
    this.isEditing = true;
    this.editingTaskId = task.id;
    this.newTask = { ...task };
  }

  updateTask() {
    if (!this.editingTaskId) return;

    const taskDoc = doc(
      this.firestore,
      `tasks/${this.editingTaskId}`
    ).withConverter(taskConverter);
    updateDoc(taskDoc, { ...this.newTask })
      .then(() => {
        alert('Tarefa atualizada com sucesso!');
        this.tasks = this.tasks.map((task) =>
          task.id === this.editingTaskId
            ? { ...this.newTask, id: task.id }
            : task
        );
        this.resetForm();
      })
      .catch((error) => console.error('Erro ao atualizar tarefa:', error));
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

  cancelEdit() {
    this.resetForm();
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
    this.isEditing = false;
    this.editingTaskId = undefined;
  }

  logout() {
    this.auth.signOut().then(() => {
      window.location.href = '/login';
    });
  }
}
