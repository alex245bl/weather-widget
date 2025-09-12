import React, {useEffect, useState} from "react";
import "./style.scss";
const CheckCookieByName = (name: string) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

const LightSwitch = () => {
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        const themeValue = CheckCookieByName('theme');
        if(themeValue) {
            document.body.className = themeValue;
            setChecked(themeValue === 'dark');
        }
        else
        {
            document.body.className = 'light';
        }
    }, []);
    const handleToggle = () => {
        setChecked(!checked);
        document.body.className = checked ? 'light' : 'dark';
        document.cookie = 'theme=' + (checked ? 'light' : 'dark');
    }
    return (
        <div className={'light_switch_block'}>
            <label  className="switch">
                <input checked={checked} onChange={handleToggle}  type="checkbox"/>
                <span className="slider round"></span>
            </label>
            <div className={'switch_text ' + (checked ? 'dark' : 'light')}>
                {
                    checked ? 'Dark Mode' : 'Light Mode'
                }
            </div>
        </div>
    )
}
export default LightSwitch;