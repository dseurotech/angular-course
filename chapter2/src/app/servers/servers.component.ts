import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-servers]',
  templateUrl: './servers.component.html'
})
export class ServersComponent implements OnInit{
  
  allowNewServer = false;
  serverCreationStatus = 'No server was created'
  serverName='';
  serverCreated = false;
  servers = ['TestServer', 'TestServer2'];
  constructor(){
    setTimeout(()=>{
      this.allowNewServer=true;
    },2000);
  }
  ngOnInit(): void {
  }

  onCreateServer() {
    this.serverCreationStatus = "Server was created! Name is "+this.serverName;
    this.serverCreated=true;
    this.servers.push(this.serverName);
    this.serverName="";
  }

  onUpdateServerName(event: any) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
