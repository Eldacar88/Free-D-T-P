import "./labels.css"
import GlobalContext from "../../Context/GlobalContext";
import React, {useContext} from 'react';

const Labels = () => {
    const { labels, updateLabel } = useContext(GlobalContext);

    function applyLabelcolor (lbl) {
        if(lbl === "wettkampf"){
            return "color_00";
        }
        else if(lbl === "geschwindigkeit"){
            return "color_01";
        }
        else if(lbl === "technik"){
            return "color_02";
        }
        else if(lbl === "ausdauer"){
            return "color_03";
        }
        else if(lbl === "kraft"){
            return "color_04";
        }
        else if(lbl === "kraftausdauer"){
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