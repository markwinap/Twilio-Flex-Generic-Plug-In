import { orange } from "@material-ui/core/colors";

//https://www.twilio.com/docs/flex/overriding-themes-branding-and-styling

const brandColor1 = "#E71D36";
const brandColor2 = "#011627";
const brandTextColor = "#ffffff";

const oranege = "#00634e"; //f58220
const orange_text = "#fe9341";//F37721
const green = "#333d48";
const buton_background = "#ED2525";
const buton_border = "#e61313";
const grey_text = "#4b5a6b";
const grey_ligth = "#eff2f3";
const grey_dark = "#b3b9ca";
const white = "#fff";


const configuration = {
    colorTheme: {
        baseName: "GreyDark",
        colors: {
            base0: "#000000",
            base1: "#222222",
            base2: "#444444",
            base3: "#d4d4d4",
            base4: "#e0e0e0",
            base5: "#efefef",
            base6: "#ffffff",
            darkTextColor: "#222222",
            buttonHoverColor: "rgba(0, 0, 0, 0.2)",
            tabSelectedColor: "#009cff",
            connectingColor: "#ff9800",
            disconnectedColor: "#c0192d"
        }
    }
};

export default {
    EntryPoint: {
        Container: {
            background: green,
            color: green
        }
    },
    
    UserCard: {
        AvatarContainer: {
            background: "#fff",
            borderColor: grey_dark,
            color: green
        },
        AvailabilityContainer: {
            borderColor: green,
            color: green,
            background: green,
        }
    },
    Avatar: {
        Container: {
            borderColor: grey_dark,
            background: "#fff",
        },
        AvailabilityIcon: {
            borderColor: grey_dark
        }
    },
    UserActivityControls: {
        Item: {
            color: "#fff",
            lightHover: false
        },
        Items: {
            background: green,
        },
        Divider: {
            background: green,
        }
    },
    TaskCardPlaceholder: {
        borderColor: green
    },
    
    NoTasksCanvas: {
        Container: {
            color: grey_text,
            background: "transparent"
        },
        Hint: {
            color: orange_text
        },
    },
    MainHeader: {
        Container: {
            //backgroundImage: `url("https://cinnabar-dachshund-2054.twil.io/assets/Endless-Constellation.svg")`
            //background: ,white
            backgroundColor: "#fff",
            color: orange_text,
            borderColor: green
        },
        Button: {
            color: green,
            lightHover: true
        }
    },
    SideNav: {
        Container: {
            backgroundColor: "#fff",
            //background: lightTheme ? colors.base8 : colors.base3,
            //borderColor: colors.base4
        },
        Button: {
            color: green,
            //background: lightTheme ? colors.base8 : colors.base3,
            //
            background: "#fff",
            lightHover: true
        },
        Icon: {
            color: green
        },
    },
    Menu: {
        Item: {
            lightHover: !green
        },
        Items: {
            color: orange_text,
            background: green
        }
    },
    TaskList: {
        Filter: {
            Container: {
                background: "#7fbfb0",
                borderColor: green
            },
        },
        Item: {
            Container: {
                background: "transparent"
            },
            SelectedContainer: {
                background: "#f7ad79"
            },
        },
    },
    TaskCanvas: {
        Container: {
            background: "transparent"
        }
    },
    TaskCanvasHeader: {
        Container: {
            //background: colors.base1,
            color: green
        },
        WrapupTaskButton: {
            background: buton_background,
            //color: colors.declineTextColor,
        },
        EndTaskButton: {
            background: buton_background,
            //color: colors.declineTextColor,
        }
    },
    CRMContainer: {
        Container: {
            borderColor: green
        },
        Placeholder: {
            Container: {
                color: grey_text,
                background: "transparent"
            },
            Icon: {
                color: green
            },
            Button: {
                background: buton_background,
                //color: green
            },
            Hint: {
                color: orange_text
            }
        }
    },
    MainContainer: {
        backgroundColor: "#f5f5f5",
        //backgroundImage: `url("https://cinnabar-dachshund-2054.twil.io/assets/Randomized-Pattern.svg")`
    },
    AgentDesktopView: {
        Panel1: {
            background: "transparent"
        },
        Panel2: {
            background: "transparent"
        },
        ContentSplitter: {
            background: "transparent"
        }
    },
    Tabs: {
        Container: {
            background: "transparent"
        }
    },
    Chat: {
        MessagingCanvas: {
            Container: {
                background: "transparent"
            }
        },
        MessageInput: {
            Container: {
                background: grey_dark
            }
        },
    },
    Supervisor: {
        Container: {
            background: "transparent"
        }
    },
    

};