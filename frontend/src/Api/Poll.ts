import { z } from "zod";
import { validateResponse } from "./validateResponse";

export interface IPollVote {
  pollId: number;
  optionId: number;
}

const OptionSchema = z.object({
  id: z.number(),
  optionText: z.string(),
  votes: z.number(),
});
const OptionsSchema = z.array(OptionSchema);

const PollSchema = z.object({
  id: z.number(),
  question: z.string(),
  options: OptionsSchema,
});

export const CreatePollSchema = PollSchema.omit({ id: true }).extend({
  question: z
    .string()
    .min(5, "Вопрос должен содержать минимум 5 символов")
    .max(60, "Вопрос должен содержать не более 60 символов"),
  options: z
    .array(
      z.string().min(2, "Вариант ответа должен содержать минимум 2 символа")
    )
    .min(2, "Должно быть минимум 2 варианта ответа"),
});

export type CreatePoll = z.infer<typeof CreatePollSchema>;

const PollsListSchema = z.array(PollSchema);
export type OptionsList = z.infer<typeof OptionsSchema>;
export type PollsList = z.infer<typeof PollsListSchema>;

export const createPoll = async (data: CreatePoll): Promise<Response> => {
  const parsedData = CreatePollSchema.parse(data);
  console.log("Данные перед отправкой:", parsedData);
  return fetch("/api/polls", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsedData),
  }).then(validateResponse);
};

export const getPolls = (): Promise<PollsList> => {
  return fetch("api/polls")
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => PollsListSchema.parse(data));
};

export const deletePoll = (pollId: number): Promise<Response> => {
  return fetch(`api/polls/${pollId}`, {
    method: "Delete",
  });
};

export const votePollOption = ({
  pollId,
  optionId,
}: IPollVote): Promise<Response> => {
  return fetch(`api/polls/${pollId}/vote`, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      optionId,
    }),
  });
};
