/*bg-[#fefefe] */

export default function Input(props){
	return(
		<input
			{...props}
			className="
				bg-transparent border-b-4 border-color:white text-white
				transition-all
				outline-none   
				rounded 
				p-2 
				mt-2 
				w-full 
				focus:shadow-inputfocus 
				focus:transition-transform 
				focus:-translate-y-1
				focus:ease-in-out
				focus:duration-500
				duration-500
				border-bottom-white
				tracking-wide
				"
		/>	
	)
}