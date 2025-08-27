export default function Contact() {
  return (
    <section id="contact" className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-10">
      <h2 className="text-3xl font-bold mb-6">Contact Me</h2>

      <form
        action="https://formspree.io/f/myzdyrdj"  // 🔥 Your formspree link
        method="POST"
        className="w-full max-w-md space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full px-4 py-2 rounded-lg text-black"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full px-4 py-2 rounded-lg text-black"
        />

        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          required
          className="w-full px-4 py-2 rounded-lg text-black"
        ></textarea>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-indigo-600 font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
