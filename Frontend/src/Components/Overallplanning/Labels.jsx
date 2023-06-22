import "./labels.css"
import GlobalContext from "../../Context/GlobalContext";
import React, {useContext} from 'react';

const Labels = () => {
    const { labels, updateLabel } = useContext(GlobalContext);

    function applyLabelcolor (lbl) {
        if(lbl === "indigo"){
            return "color_00";
        }
        else if(lbl === "gray"){
            return "color_01";
        }
        else if(lbl === "green"){
            return "color_02";
        }
        else if(lbl === "blue"){
            return "color_03";
        }
        else if(lbl === "red"){
            return "color_04";
        }
        else if(lbl === "purple"){
            return "color_05";
        }
    }

    return (
        <React.Fragment>
            <p className="labelparagraph">Label</p>
                {labels.map(({ label: lbl, checked }, idx) => (
                <label key={idx} className="label">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                    updateLabel({ label: lbl, checked: !checked })
                    }
                    className={`labelinput ${applyLabelcolor(lbl)}`}
                />
                <span className="labelspan">{lbl}</span>
                </label>
            ))}
    </React.Fragment>
    )
}

export default Labels;