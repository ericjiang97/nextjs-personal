export default function Custom404() {
  return (
    <div className="max-w-4xl mx-auto py-auto flex-1 flex justify-center items-center flex-col">
      <h1 className="m-0 w-full pt-20 leading-tight mb-5 text-5xl text-center font-bold">
        404 - <strike>Droids</strike> Page Not Found
      </h1>
      <img src="/images/hello_there.gif" />

      <h3 className="m-0 w-full pt-10 leading-tight text-2xl text-center font-bold  text-gray-700">
        Hello there. <strike>These are not the droids</strike> This is not the
        page, you are looking for.
      </h3>
      <p className="m-0 pt-3 py-0 pb-0 text-sm text-gray-500">
        What are you doing?? Either you're here by accident... or are you trying
        to find hidden features? 🤔
      </p>
    </div>
  );
}
