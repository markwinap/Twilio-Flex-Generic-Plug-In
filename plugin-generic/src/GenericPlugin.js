
import React from 'react';
//FLEX
import { FlexPlugin } from 'flex-plugin';
import { View, SideLink, Actions } from '@twilio/flex-ui';
//FLEX COMPONENTS
import MainHeader from './MainHeader';
import AgentDesktopView from './AgentDesktopView';
import SideNav from './SideNav'; 
import ViewCollection from './ViewCollection';
import TaskInfoPanel from './TaskInfoPanel';
//FLEX THEME
import CustomThemeOverrides from './CustomThemeOverrides';
//SEMANTIC
import { Icon } from 'semantic-ui-react'

const PLUGIN_NAME = 'GenericPlugin';

const inspirationalQuotes = [
  "'Make each day your masterpiece.' – John Wooden",
  "'The difference between ordinary and extraordinary is that little extra.' – Jimmy Johnson",
  "'We are what we repeatedly do. Excellence, then, is not an act, but a habit.' – Aristotle"
];

export default class GenericPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    //CUSTOM THEME
    manager.updateConfig({colorTheme: { baseName: "MediumTheme", overrides: CustomThemeOverrides}});
    //CUSTOM LOGO
    flex.MainHeader.defaultProps.logoUrl = "https://s3.amazonaws.com/marmarti-testing/FLEX/LOGO/tata.svg";
    //flex.MainHeader.defaultProps.logoUrl = 'https://www.sce.com/themes/custom/sce_responsive/images/home_logo.png';
    //CUSTOM STRING REPLACEMENTS
    manager.strings.TaskHeaderLine = "{{task.attributes.account_data.first_name}} {{task.attributes.account_data.last_name}}";
    manager.strings.TaskLineCallReserved = "SLA: {{task.attributes.account_data.service_level}}";
    manager.strings.NoTasksTitle = "Get ready to delight our customers!";
    manager.strings.TaskInfoPanelContent = ".";
    //CUSTOM NOTIFICATIONS ALERTS
    flex.Notifications.registerNotification({
      id: "BreakNotificationMsg",
      content: "I believe in stopping work and eating lunch.",
      type: flex.NotificationType.warning
    });
    flex.Notifications.registerNotification({
      id: "vipNotification",
      content: "VIP Email, please complete the task in the next hour",
      type: flex.NotificationType.alert
    });
    flex.Notifications.registerNotification({
      id: "JokeNote"
    });
    let randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
    flex.Notifications.registerNotification({
      id: "InspirationalQuote",
      content: randomQuote,
      type: flex.NotificationType.warning
    });
    //NOTIFICATIONS DISPATCH
    flex.Notifications.showNotification("InspirationalQuote", null);
    //NOTIFICATION FETCH
    fetch('https://cinnabar-dachshund-2054.twil.io/joke')
    .then(res => { return res.text() })
    .then(joke => {
      const jokeNote = flex.Notifications.registeredNotifications.get("JokeNote")
      jokeNote.type = flex.NotificationType.success;
      jokeNote.content = joke;//joke
      flex.Notifications.showNotification("JokeNote");
    });
    //CUSTOM CHANNEL [EMAIL]
    const emailChannel = flex.DefaultTaskChannels.createDefaultTaskChannel("Email",  (task) => task.taskChannelUniqueName === "email");
    emailChannel.icons = {
      list: <div><Icon name='mail' size='big'/></div>,
      main: <div><Icon name='mail' size='big'/></div>,
      active: <div><Icon name='mail' size='big'/></div>,
    };
    emailChannel.colors = {main:  "#F37721"};
    flex.TaskChannels.register(emailChannel);

    //ACTION EVENT LISTENR 
    flex.Actions.addListener("afterAcceptTask", (payload) => {
      if(payload.task.attributes.vip){
        flex.Notifications.showNotification("vipNotification", null);
      }
    });
    //ACTIONS REPLACE ACTIONS
    flex.Actions.replaceAction("SetActivity", (payload, original) => {
      return new Promise((resolve, reject) => {
        if (payload.activityName === "Offline") {
          alert("Please use Unavailable status during business hours.");
          reject();
        }
        else if(payload.activityName === "Break"){
          flex.Notifications.showNotification("BreakNotificationMsg", null);
          resolve();
        }
        resolve();
      }).then(() => original(payload));
    });
    //ACTIONS WORKER - AUTO ACCEPT CHAT
    manager.workerClient.on("reservationCreated", reservation => {
      if (reservation.task.taskChannelUniqueName === 'chat') {
        flex.Actions.invokeAction("AcceptTask", { sid: reservation.sid });
        flex.Actions.invokeAction("SelectTask", { sid: reservation.sid });
      }
    });
    //CUSTOM HEADER CONTENT
    flex.MainHeader.Content.add(
      <MainHeader key="main-header" />,
      {
        sortOrder: 1,//sortOrder: -1, (1 - For start -1 for End order)
      }
    );
    //CUSTOM Side Nav Button
    flex.SideNav.Content.add(
      <SideNav key="sidenav-button" />
    );
    flex.ViewCollection.Content.add(
      <View name="custom-view" key="custom-view">
        <ViewCollection key="view-collection" />
      </View>
    );
    //INFO CONTAINER AS COMPONENT
    flex.TaskInfoPanel.Content.remove("container");
    // and replace it with our new component
    flex.TaskInfoPanel.Content.add(<TaskInfoPanel key="custom_info" />);
    //CRM CONTAINER AS COMPONENT
    flex.AgentDesktopView.Panel2.Content.remove("container");
    // and replace it with our new component
    flex.AgentDesktopView.Panel2.Content.add(<AgentDesktopView key="custom-crm" />);


  }
}


/*
//ACTIONS
SelectTask
AcceptTask
RejectTask
CompleteTask
WrapupTask
SetActivity
TransferTask
Logout
*/
