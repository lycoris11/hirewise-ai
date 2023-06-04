/*bg-[#fefefe] */

export default function Input(props){
	return(
		<input
			{...props}
			className="
				input-ghost
				outline-none 
				border-gray-300 
				border 
				rounded 
				p-2 
				mt-3 
				w-full 
				focus:shadow-inputfocus 
				focus:transition-transform 
				focus:-translate-y-1
				focus:ease-in-out
				focus:duration-700
				duration-700
				border-bottom-white
				"
		/>	
	)
}