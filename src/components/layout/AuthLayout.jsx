function AuthLayout({ title, subtitle, footer, children }) {
  return (
    <div
        className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-cover bg-center px-6 py-12"
        style={{ backgroundImage: "linear-gradient(rgba(10,15,13,0.6), rgba(10,15,13,0.6)), url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&q=80')" }}>

      <div className="w-full max-w-md rounded-3xl bg-white/20 p-8 text-white backdrop-blur-sm">
        <h1 className="text-center text-2xl font-extrabold">{title}</h1>
        <p className="mt-1 text-center text-sm text-stone-200">{subtitle}</p>
        <div className="mt-6">{children}</div>
        <p className="mt-6 text-center text-sm text-stone-200">{footer}</p>
        <p className="mt-4 text-center text-xs text-stone-300">
          Demo sign-in for a class project. This is not secure authentication.
        </p>
      </div>
    </div>
  )
}

export default AuthLayout