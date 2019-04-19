import React from 'react';
import {SideLink, Actions } from  '@twilio/flex-ui';

const CustomSideBarButton =  ({activeView }) =>{

function navigate()
{
    Actions.invokeAction('NavigateToView', {viewName:'custom-view'});
}

return(
    <SideLink 
        showLabel={true}
        icon="Eye"
        iconActive="EyeBold"
        isActive={activeView ==='custom-view'}
        onClick={navigate }
>
Custom View 
</SideLink>
);
};

export default CustomSideBarButton;