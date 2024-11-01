import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreatePoll, createPoll, CreatePollSchema } from "../../Api/Poll";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import FormField from "../ui/FormField/FormField";
import { normalizeText } from "../../utils/normalizeText";

interface CreatePollFormProps {
  onSuccess: () => void;
}

const CreatePollForm: React.FC<CreatePollFormProps> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePoll>({
    resolver: zodResolver(CreatePollSchema),
  });
  const [options, setOptions] = useState(["", ""]);

  const pushPollMutation = useMutation(
    {
      mutationFn: createPoll,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["polls"] });
        setOptions(["", ""]);
        reset();
        onSuccess();
      },
    },
    queryClient
  );

  const onSubmit: SubmitHandler<CreatePoll> = (data) => {
    const normalizedQuestion = normalizeText(data.question);
    const normalizedOptions = options.map((option) => normalizeText(option));
    const normalizedData = {
      question: normalizedQuestion,
      options: normalizedOptions,
    };
    pushPollMutation.mutate(normalizedData);
  };

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, ""]);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <FormField label="Вопрос" errorMessage={errors.question?.message}>
        <input
          type="text"
          {...register("question")}
          placeholder="Введите ваш вопрос"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </FormField>

      <div>
        <label className="text-sm font-medium text-gray-700">
          Варианты ответа:
        </label>
        <div className="space-y-2 mt-2">
          {options.map((option, index) => (
            <FormField
              key={index}
              label={`Вариант ${index + 1}`}
              errorMessage={errors.options?.[index]?.message}
            >
              <div className="flex items-center">
                <input
                  type="text"
                  {...register(`options.${index}`)}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder="Напишите вариант ответа"
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 flex-grow w-full max-w-full"
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                    aria-label="Удалить вариант"
                  >
                    ✕
                  </button>
                )}
              </div>
            </FormField>
          ))}
        </div>
      </div>
      {options.length < 5 && (
        <button
          type="button"
          onClick={handleAddOption}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Добавить вариант ответа
        </button>
      )}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Создать опрос
      </button>
    </form>
  );
};

export default CreatePollForm;
