import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css"
function App() {
	const [password, setPassword] = useState("");
	const [isNumberAllowed, setIsNumberAllowed] = useState(false);
	const [isCharAllowed, setIsCharAllowed] = useState(false);
	const [length, setLength] = useState(0);

	const passwordRef = useRef(null);


	const passWordGenerator = useCallback(()=>{
		let passwordString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		let generatedPassword = "";
		if(isNumberAllowed){
			passwordString+='0123456789';
		}
		if(isCharAllowed){
			passwordString+='!@#$%^&*()_-+=~`<>?:"{}[];,./';
		}
		for(let i=0;i<length;i++){
			const randomIndex = Math.floor((Math.random()*passwordString.length+1));
			generatedPassword += passwordString[randomIndex];
		}

		setPassword(generatedPassword);	
	}, [length, isNumberAllowed, isCharAllowed, setPassword]);

	useEffect(() => {
		passWordGenerator();
	}, [length, isNumberAllowed, isCharAllowed, passWordGenerator])

	const copyPassword = () => {
		/**To select when copy button is pressed */
		passwordRef.current?.select();

		/**To select given range */
		passwordRef.current?.setSelectionRange(0,50);
		/**Copy text */
		window.navigator.clipboard.writeText(password);
	}

	return (
		<div className="w-full flex justify-center content-center bg-gray-800 border-2 text-white">
			<div className="w-full flex flex-col justify-center content-center m-4">
				<span className="text-center m-3 text-lg">Password Generator</span>
				<div className="w-full flex content-center justify-center my-3">
					<input className="w-96 px-2 py-2 rounded-s text-black" type="text" value={password} ref={passwordRef} readOnly />
					<button className="px-6 py-2 bg-blue-500 rounded-e hover:bg-blue-700" onClick={copyPassword}>Copy</button>
				</div>
				<div className="flex justify-center align-middle flex-row gap-5">
					<div className="flex align-middle">
						<input className="mr-2" type="range" min={0} max={50} value={length} onChange={(e)=>setLength(e.target.value)}/>
						Length:<span>{length}</span>
					</div>
					<div className="flex align-middle">
						<input className="mr-1" type="checkbox" onChange={()=>setIsNumberAllowed(prev => !prev)} checked={isNumberAllowed}/>
						<label htmlFor="">Number</label>
					</div>
					<div className="flex align-middle">
						<input className="mr-1" type="checkbox" onChange={()=>setIsCharAllowed(prev => !prev)} checked={isCharAllowed}/>
						<label htmlFor="">Character</label>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;     