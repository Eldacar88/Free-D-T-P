import "./labels.css"
import GlobalContext from "../../Context/GlobalContext";
import React, {useContext} from 'react';

const Labels = () => {
    const { labels, updateLabel } = useContext(GlobalContext);

    function applyLabelcolor (lbl) {
        if(lbl === "wettkampf"){
            return "label_color_0";
        }
        else if(lbl === "geschwindigkeit"){
            return "label_color_1";
        }
        else if(lbl === "technik"){
            return "label_color_2";
        }
        else if(lbl === "ausdauer"){
            return "label_color_3";
        }
        else if(lbl === "kraft"){
            return "label_color_4";
        }
        else if(lbl === "kraftausdauer"){
            return "label_color_5";
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