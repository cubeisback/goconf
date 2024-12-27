import { css } from "@emotion/css";
import { Button } from "./ui";
import { motion } from 'framer-motion';
import { useState } from "react";


const AnimatedSwitch = ({ label, initialChecked = false }) => {
    const [isChecked, setIsChecked] = useState(initialChecked);
  
    const toggleSwitch = () => {
      setIsChecked(!isChecked);
    };
  
    return (
      <div className={css`display: flex; gap:8px;cursor:pointer;`} onClick={toggleSwitch}>
        <div
            className={css`
                width: 40px;
                height: 24px;
                background-color: ${isChecked ? '#8553F9' : '#B5B7B9'};
                border-radius: 28px;
                position: relative;
                transition: .3s;

            `}
        >
            <div className={css`
                position: absolute;
                top: 3px;
                left: ${isChecked ? '20px' : '2px'};
                width: 18px;
                height: 18px;
                background-color: #fff;
                border-radius: 100%;;
                transition: .3s;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            `}/>
        </div>
        <span>{label}</span>
      </div>
    );
};

export const UserNotifications = () => {

    return(
        <>
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: .3 }}
            
            className={css`min-height: calc(100vh - 300px);`}
        >
            <div className={css`
                font-family: Impact;
                font-size: 36px;
                line-height: 1.12;
                margin-bottom: 32px;
            `}>Настройки уведомлений</div>
            
            <div className={css`display:flex;flex-direction:column;gap:24px;margin-bottom:32px;`}>
                <div className={css`font-size:20px;font-weight:bold;line-height:1.4;`}>Письма на почту</div>
                <AnimatedSwitch label="Измененние статуса мероприятия" initialChecked={true} />
                <AnimatedSwitch label="Движения по счету" initialChecked={false} />
                <AnimatedSwitch label="Новости площадки" />
            </div>

            <div className={css`display:flex;flex-direction:column;gap:24px;margin-bottom:32px;`}>
                <div className={css`font-size:20px;font-weight:bold;line-height:1.4;`}>Уведомления на сайте</div>
                <AnimatedSwitch label="Измененние статуса мероприятия" initialChecked={true} />
                <AnimatedSwitch label="Движения по счету" initialChecked={true} />
            </div>

            <Button>Сохранить изменения</Button>
        </motion.div>
        
        </>
    )
};