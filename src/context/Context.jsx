import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    
const [input, setInput] = useState("");
const [recentPrompt, setRecentPrompt] = useState("");
const [prevPrompt, setPrevPrompt] = useState([]);
const [showResult, setShowResult] = useState(false);
const [loading, setLoading] = useState(false);
const [resultData, setResultData] = useState("");

const delayPara = (index, nextWord) => {
    setTimeout(function(){
        setResultData(prev => prev + nextWord);
    }, 75*index)
}

    const onSent = async(prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        const response = await runChat(input)
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i % 2 === 1) {
                newResponse += "<b>" + responseArray[i] + "</b>";
            } else {
                newResponse += responseArray[i];
            }
        }
        newResponse = newResponse.replace(/\*/g, "<br />");

        let newResponseArray = newResponse.split(" ")
        for(let i = 0; i < newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ")
        }
        setLoading(false)
        setInput("")
    }


    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        // newChat
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider