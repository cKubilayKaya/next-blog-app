import EmailVerifyForm from "@/components/forms/EmailVerifyForm";

export default function EmailVerify() {
  return (
    <>
      <div className="flex min-h-screen h-auto flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8" style={{ minHeight: "calc(100vh - 91px)" }}>
        <div className="border border-gray-300 px-4 py-12 rounded-2xl w-[480px]">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img alt="Your Company" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" className="mx-auto h-10 w-auto" />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Verify Your Email</h2>
          </div>
          <EmailVerifyForm />
        </div>
      </div>
    </>
  );
}
