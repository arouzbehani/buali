import {  makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from 'uuid'
export default class ActivityStore{
//    activities : Activity[]=[];
    activityRegistry = new Map<string,Activity>();
    selectedActivity:Activity | undefined =undefined;
    editMode=false;
    loading=false;
    loadInitial=true;

    constructor(){
        makeAutoObservable(this);
        }
get activitiesByDate (){
    return Array.from(this.activityRegistry.values()).sort((a,b)=> Date.parse(a.date) - Date.parse(b.date) );
}
        loadinActivities= async()=>{
            //this.setLoadingInitial(true);
            try{
                const activities=await agent.Activities.list();
                activities.forEach(element => {
                    element.date = element.date.split('T')[0];
                  //  this.activities.push(element);
                    this.activityRegistry.set(element.id,element);
            })
            this.setLoadingInitial(false);

        }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
        setLoadingInitial=(state:boolean)=>{
            this.loadInitial=state;
        }
        selectActivity =(id:string)=>{
          //  this.selectedActivity= this.activities.find(a=>a.id===id);
            this.selectedActivity=this.activityRegistry.get(id);
        }
        cancelSelectedActivity=() =>{
            this.selectedActivity= undefined;
            this.editMode=false;

        }
        openForm=(id?:string)=>{
            id ?this.selectActivity(id):this.cancelSelectedActivity();
            this.editMode=true;
        }
        closeForm=()=>{
            this.editMode=false;

        }

        creatActivity=async (activity: Activity)=>{
            this.loading=true;
            activity.id=uuid();
            try{

                await agent.Activities.create(activity);
                runInAction(()=>{
                    //this.activities.push(activity);
                    this.activityRegistry.set(activity.id,activity);
                    this.selectedActivity=activity;
                    this.editMode=false;
                })
            }catch(error){
                console.log(error);
                runInAction(()=>{
                    this.loading=false;
                    this.editMode=false;
                })
            }
        }
        updateActivity=async (activity: Activity)=>{
            this.loading=true;
            try{

                await agent.Activities.update(activity);
                runInAction(()=>{
                 //   this.activities=[...this.activities.filter(x=>x.id!==activity.id),activity];
                    this.activityRegistry.set(activity.id,activity);
                    this.selectedActivity=activity;
                    this.loading=false;
                    this.editMode=false;
                })
            }catch(error){
                console.log(error);
                runInAction(()=>{
                    this.loading=false;
                    this.editMode=false;
                })
            }
        }

        deleteActivity=async (id:string)=>{
            this.loading=true;
            try{
                await agent.Activities.delete(id);
                runInAction(()=>{
                    //this.activities=[...this.activities.filter(x=>x.id !==id)]
                    this.activityRegistry.delete(id);
                    if (this.selectedActivity?.id===id) this.cancelSelectedActivity();
                    this.loading=false;
                })

            }catch(error){
                runInAction(()=>{
                    this.loading=false;
                })


            }
        }
   
}
