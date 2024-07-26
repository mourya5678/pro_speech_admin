import React, { useState } from 'react';
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "survey-core/defaultV2.css";
import "survey-creator-core/survey-creator-core.css";

const SurveyCreators = () => {
    let [creator, setCreator] = useState();
    if (creator === undefined) {
        let options = { showLogicTab: true, showTranslationTab: true };
        creator = new SurveyCreator(options);
        creator.saveSurveyFunc = (no, callback) => {
            console.log(JSON.stringify(creator.JSON));
            callback(no, true);
        };
        setCreator(creator);
    }

    return (
        <div>
            <div style={{ height: "calc(100% - 70px)" }}>
                <SurveyCreatorComponent creator={creator} />
            </div>
        </div>
    )
}

export default SurveyCreators