export function EmailInput({onChange, emailAddr}){

  return(
    <>
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        Email *
      </label>
      <input
        onChange={onChange} 
        name="email" 
        type="text"
        className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6
          focus:transition-transform 
          focus:-translate-y-1
          focus:ease-in-out
          focus:duration-500
          duration-500"
        placeholder="you@email.com"
        defaultValue={emailAddr}
      />
    </>
  )
}

export function PasswordInput({onChange}){

  return(
    <>
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        Password *
      </label>
      <input
        onChange={onChange} 
        name="password" 
        type="password"
        className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6
          focus:transition-transform 
          focus:-translate-y-1
          focus:ease-in-out
          focus:duration-500
          duration-500"
        placeholder="*********"
      />
    </>
  )
}

export function ButtonSubmit({onClick, shake, text}){
  return(
    <button
      onClick={onClick}
      className={
        `
          flex justify-center items-center py-2 px-4 self-stretch
          shadow-sm rounded-md bg-indigo-500
          ${shake ? 'shake': ''}
          hover:transition-transform
          hover:-translate-y-1 
          hover:ease-in-out
          hover:duration-500
          duration-500
        `
      }
    >
      <p className="font-normal tracking-wider text-sm leading-5 text-white">{text}</p>
    </button>
  )
}