import emailjs from '@emailjs/browser';

export default function Contact() {

  function sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm(process.env.NEXT_PUBLIC_SERVICE_ID, process.env.NEXT_PUBLIC_TEMPLETE_ID, e.target, process.env.NEXT_PUBLIC_USER_ID)

    .then((result) => {
        alert("Mensagem enviada com sucesso!👍 Responderei o mais breve possível.");
      
    }, (error) => {
        alert(error.message)
        
    });
    e.target.reset()
  }

  return(
    <section className='bg-gray-800 text-gray-300' id="contact">
        <div id="contato" class="mx-auto max-w-screen-xl px-4 py-4 sm:py-16 sm:px-6 lg:px-8">

          <h2 class="text-3xl font-bold text-center sm:text-4xl">Vamos trabalhar juntos?</h2> 
          <p class="mt-2 text-center">Mande uma mensagem que responderei em breve</p>

          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-16">
            
            <div class="mt-8 relative h-1/2 hidden rounded-lg sm:block">
              <img
              alt="Party"
              src='/mobile_messages.svg'
              class="object-cover w-full lg:w-3/4 m-auto"
              />
            </div>

            <div>
              <form onSubmit={sendEmail} class="mx-auto mt-8 mb-0 max-w-md space-y-4">
                <div>
                  <div class="relative">
                    <input
                      type="text"
                      name="name"
                      class="w-full rounded-lg border-gray-200 text-gray-300 placeholder-gray-300 bg-gray-800 p-4 pr-12 text-sm shadow-sm"
                      placeholder="Seu nome"
                    />
                  </div>
                </div>

                <div>
                  <div class="relative">
                    <input
                      type="email"
                      name="email"
                      class="w-full rounded-lg border-gray-200 bg-gray-800 placeholder-gray-300 p-4 pr-12 text-sm shadow-sm"
                      placeholder="Seu e-mail"
                    />
                  </div>
                </div>

                <div>
                  <div class="relative">
                    <textarea 
                      rows="6" 
                      placeholder="Digite sua mensagem" 
                      name="message"
                      class="mt-1 block w-full rounded-lg border-gray-200 bg-gray-800 placeholder-gray-300 p-4 pr-12 text-sm shadow-sm"
                    >
                    </textarea>
                  </div>
                </div>

                <div class="flex items-center justify-center">
                  <button
                    type="submit"
                    class="mt-4 mr-3 inline-flex items-center rounded border border-indigo-600 bg-indigo-600 px-6 py-2 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                  >
                    <span class="text-lg">Enviar</span>
                  </button>
                </div>
              </form>
              
            </div>

          </div>
        </div>
      </section>
  )
}