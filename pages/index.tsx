import type { NextPage } from "next";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

interface CreateFrom {
  id: string;
  link: string;
}

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreateFrom>({
    mode: "onChange",
  });
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModal] = useState(false);
  const [errorData, setErrorData] = useState({});

  const onValid = (data: CreateFrom) => {
    setLoading(true);
    fetch("/api/create/link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => setErrorData(res.error))
      .catch((err) => console.error(err))
      .finally(() => {
        openModal();
      });
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  const openModal = () => {
    setModal(true);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900">
        <div className="flex flex-col items-center justify-center rounded-3xl bg-neutral-800 p-10 shadow-2xl">
          {isModalOpen == !true ? (
            <>
              <h1 className="bold text-7xl font-bold text-white">Short Url</h1>
              <p className="text-3xl font-thin text-white">Fast url shorter</p>
              <form
                onSubmit={handleSubmit(onValid, onInvalid)}
                className="m-6 flex space-x-3"
              >
                <input
                  {...register("link", {
                    required: "This is required.",
                  })}
                  type="url"
                  placeholder="Write Long Url..."
                  className=" w-96 rounded-lg bg-white p-3 text-xl shadow-xl"
                />
                <input
                  {...register("id", {
                    required: "This is required.",
                    maxLength: {
                      value: 10,
                      message: "This input exceed maxLength.",
                    },
                  })}
                  type="text"
                  placeholder="Write Custom Code"
                  className=" w-96 rounded-lg bg-white p-3 text-xl shadow-xl"
                />
                <input
                  type="submit"
                  className="rounded-lg bg-white p-5 font-bold shadow-xl"
                  value={`${isLoading ? "Loading..." : "Create Url"}`}
                />
              </form>
            </>
          ) : (
            <>
              {errorData ? (
                <>
                  <h1 className="text-5xl font-bold text-white">
                    이미 존재해요 :(
                  </h1>
                </>
              ) : (
                <>
                  <h1 className="text-5xl font-bold text-white">생성완료!</h1>
                  <h1 className="my-5 text-3xl font-bold text-blue-500">
                    {`https://short-url-rnaudah.vercel.app/i/${getValues(
                      "id"
                    )}`}
                  </h1>
                </>
              )}
              <button
                onClick={() => {
                  setErrorData({});
                  setModal(false);
                  setLoading(false);
                }}
                className="my-3 rounded-md bg-emerald-500 py-3 px-10 text-xl font-bold text-white"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
