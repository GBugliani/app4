import { TaskService } from './../services/task.service';
import { Component } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  type : string = "pending";

  constructor
  (
    public alertController: AlertController,
    public taskService: TaskService,
    public toastController: ToastController,
    public popoverController: PopoverController
  ) {}

  async presentAlertPromptAdd() {
    const alert = await this.alertController.create({
      header: 'Adicionar Tarefa!',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Tarefa'
        },
        {
          name: 'date',
          type: 'date',
          min: '2020-01-01',
          max: '2025-01-01'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },{
          text: 'Salvar',
          handler: (alertData) => {
            if (alertData.task != "")
            this.taskService.addTask(alertData.task, alertData.date);
            else {
              this.presentToast();
              this.presentAlertPromptAdd();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertPromptDelete(index: number) {
    const alert = await this.alertController.create({
      header: 'Excluir tarefa!',
      message: 'Deseja realmente excluir a tarefe?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },{
          text: 'Excluir',
          handler: () => this.taskService.delTask(index)
        }
      ]
    });
    await alert.present();
  }

  async presentAlertPromptUpdate(index: number, task: { date: any; value: any; }) {
    const alert = await this.alertController.create({
      header: 'Atualizar Tarefa!',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Tarefa',
          value : task.value
        },
        {
          name: 'date',
          type: 'date',
          min: '2020-01-01',
          max: '2025-01-01',
          value: task.date.getFullYear() + "-" + ((task.date.getMonth()+1) < 10 ? "0" + task.date.getMonth()+1 : task.date.
          getMonth()+1) + "-" + ((task.date.getDay()+1) < 10 ? "0" + task.date.getDay() : task.date.getDay())
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },{
          text: 'Salvar',
          handler: (alertData) => {
            if (alertData.task != "")
            this.taskService.updateTask(index, alertData.task, alertData.date);
            else {
              this.presentToast();
              this.presentAlertPromptAdd();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Preencha a tarefa!",
      duration: 2000
    });
    toast.present();
  }

  async presentPopOver(ev : any){
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

}
