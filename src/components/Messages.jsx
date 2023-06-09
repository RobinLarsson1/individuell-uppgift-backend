import { useState } from "react";

function Message() {
   const [message, setMessage] = useState('')


 
   return (
    <div>
        	<div class="chat-area">
		<section class="heading">
			Chattar i <span class="chat-name"> #grupp2 </span>
		</section>
	<section class="history">
		
		<section class="align-right">
			<p> VänligaVera: hejsan </p>
			<p> 17:46 </p>
		</section>
		
		<section>
			<p> MunterMoa: tjena! </p>
			<p> 17:47 </p>
		</section>
		
	</section>
	<section>
		<input type="text" placeholder="Ditt meddelande..." />
		<button> Skicka </button>
	</section>
	</div>
    </div>
   )
}

export default Message