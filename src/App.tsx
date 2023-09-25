import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import succesIcon from "./assets/Group 11.svg";
import backArrowIcon from "./assets/arrow.svg";
import emailIcon from "./assets/email.svg";
import fileIcon from "./assets/file.svg";
import { cn } from "./utils/cn";
import { isValidEmail } from "./utils/validations";
type Inputs = {
  full_name: string;
  email: string;
  file: any;
};

function App() {
  // react-form-hook config
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: "all" });

  // for json validation
  const [isJson, setIsJeson] = useState<boolean>(true);
  const [jsonFileContent, setJsonFileContent] = useState<string>("");

  // using to track if has intrected with file
  // using this for form validation of file field as react-hook-form is buging out
  // when using isValid for files field
  const [hasIntr, setHasInter] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = () => {
    // @ts-ignore
    document.getElementById("my_modal_2").showModal();
  };

  // Checks if a file input is JSON or not
  function josnFileValidatior(file: any) {
    const reader = new FileReader();
    setHasInter(true);
    // const isJson = false;

    reader.readAsText(file, "UTF-8");

    reader.onload = function (e: any) {
      const jsondata = e.target.result as string;
      // console.log("Running", file);
      try {
        // validating json content
        JSON.parse(jsondata);

        setJsonFileContent(jsondata);
        setIsJeson(true);
      } catch (e) {
        setIsJeson(false);
        console.log(e);
      }
    };
  }

  return (
    <>
      <main className="w-screen h-full px-5 pt-10 min-h-screen max-w-[740px]">
        <div className="flex mb-7">
          <button>
            <img src={backArrowIcon} />
          </button>
          <h1 className="text-2xl ml-5 font-semibold">Submit form</h1>
        </div>
        {/* form */}
        {/* three inputs
          1. name
          2. email
          3. file
        */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {/* input-1 name */}
          <label htmlFor="full-name" className="text-sm relative">
            Full Name
            <span className="text-red-500 w-full ml-3">
              {errors.full_name?.message}
            </span>
          </label>
          <input
            type="text"
            id="full-name"
            placeholder="Full Name"
            className="bg-gray-100 px-3 py-4 my-5 text-sm rounded-xl"
            {...register("full_name", {
              required: {
                value: true,
                message: "Please enter your full name",
              },
            })}
          />

          {/* input-2 email */}
          <label htmlFor="email" className="text-sm">
            Email
            <span className="text-red-500 w-full ml-3">
              {errors.email?.message}
            </span>
          </label>
          <label className="flex  bg-gray-100 my-5 rounded-xl " htmlFor="email">
            <input
              className="bg-transparent  px-3 py-4  w-full text-sm rounded-xl"
              type="email"
              id="email"
              placeholder="Full Name"
              {...register("email", {
                required: {
                  value: true,
                  message: "This feild cannot be empty",
                },
                validate: (email) =>
                  isValidEmail(email) ||
                  "give a vlaid email eg. example@example.com",
              })}
            />
            <img className="h-w-6 w-6 mr-5" src={emailIcon} alt="" />
          </label>

          {/* input-3 file */}
          <label htmlFor="">
            Upload JSON File
            <span className="text-red-500 w-full ml-3">
              {isJson ? "" : "Valid json neddedd"}
            </span>
          </label>
          <label
            className="flex flex-col my-5 justify-center items-center bg-gray-100 border-dashed border-2 h-36 w-full"
            htmlFor="file-input"
          >
            <img className="h-7" src={fileIcon} alt="" />

            <h2 className="mt-3 text-gray-400 font-bold">Browse File</h2>
            <input
              id="file-input"
              type="file"
              className="hidden"
              {...register("file")}
              onChange={(e: any) => josnFileValidatior(e.target.files[0])}
            />
          </label>
          <label className="label"> File contents</label>
          <div className="h-52 mb-4 overflow-auto">
            <p>{jsonFileContent}</p>
          </div>

          <button
            className={cn("btn btn-primary w-full rounded-full", {
              "btn-disabled": !(isValid && isJson && hasIntr),
            })}
          >
            Submit
          </button>
        </form>

        {/* POPUP message */}
        <dialog id="my_modal_2" className="modal">
          {/* image */}
          <div className="modal-box rounded-3xl text-center flex flex-col">
            <img src={succesIcon} className="h-28" alt="" />
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click outside to close</p>
            <button className="btn btn-primary rounded-full text-white">
              Go to My Entries
            </button>
            <form method="dialog" className=" w-full modal-backdrop">
              <button className="btn w-full rounded-full">Close</button>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </main>
    </>
  );
}

export default App;
