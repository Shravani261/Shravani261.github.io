/** A tiny Naive Bayes text classifier, trained in the browser on a few dozen example messages. */
export type Label = 'spam' | 'ham'

const TRAIN: [string, Label][] = [
  ['WINNER! You have won a free prize. Claim now by calling 0800 123 456', 'spam'],
  ['Congratulations! Your number has been selected for a cash reward. Text CLAIM to win', 'spam'],
  ['URGENT! Your account has been suspended. Verify now at the link to avoid charges', 'spam'],
  ['Free entry in a weekly contest. Text WIN to receive a free gift', 'spam'],
  ['You have been selected for an exclusive offer. Click the link to claim your free voucher', 'spam'],
  ['Limited time deal! Get 50% off today only. Reply YES to subscribe', 'spam'],
  ['Final notice: your loan is approved. Call now to claim cash, no credit check', 'spam'],
  ['Your parcel could not be delivered. Pay the small fee at this link to reschedule', 'spam'],
  ['Earn money fast from home! Click here to join now, guaranteed income', 'spam'],
  ['Congratulations winner, you won a free holiday. Call now to claim your prize', 'spam'],
  ['Act now! Free ringtone offer. Text STOP to cancel, charges apply', 'spam'],
  ['Your bank account is locked. Urgent action required, verify your details now', 'spam'],
  ['Hey, are we still meeting for lunch tomorrow?', 'ham'],
  ['Can you send me the notes from today\'s class?', 'ham'],
  ['I will be home by 7, do you want me to pick up dinner?', 'ham'],
  ['Happy birthday! Hope you have an amazing day', 'ham'],
  ['Don\'t forget to bring the project report to the meeting', 'ham'],
  ['Mom called, please ring her back when you are free', 'ham'],
  ['The meeting is moved to 3 pm, see you in the conference room', 'ham'],
  ['Thanks for helping me with the SQL assignment yesterday', 'ham'],
  ['Running late, the train is delayed. Start without me', 'ham'],
  ['Did you finish the dashboard? Send me the link when it is ready', 'ham'],
  ['Let\'s grab coffee after class and go through the notes', 'ham'],
  ['Good luck for the interview today, you will do great', 'ham'],
]

export const tokenize = (s: string) => s.toLowerCase().split(/[^a-z0-9£%']+/).filter(Boolean)

const counts: Record<Label, Map<string, number>> = { spam: new Map(), ham: new Map() }
const totals: Record<Label, number> = { spam: 0, ham: 0 }
const docs: Record<Label, number> = { spam: 0, ham: 0 }
const vocab = new Set<string>()

for (const [text, label] of TRAIN) {
  docs[label]++
  for (const w of tokenize(text)) {
    counts[label].set(w, (counts[label].get(w) ?? 0) + 1)
    totals[label]++
    vocab.add(w)
  }
}

const logP = (w: string, l: Label) => Math.log(((counts[l].get(w) ?? 0) + 1) / (totals[l] + vocab.size))

/** How strongly one word points to spam (+) or normal (−). 0 for words the model has never seen. */
export const wordScore = (w: string) => (vocab.has(w) ? logP(w, 'spam') - logP(w, 'ham') : 0)

/** Probability (0..1) that the message is spam. */
export function spamProbability(text: string): number {
  let d = Math.log(docs.spam / docs.ham)
  for (const w of tokenize(text)) if (vocab.has(w)) d += logP(w, 'spam') - logP(w, 'ham')
  return 1 / (1 + Math.exp(-d))
}

export const QUIZ: { text: string; label: Label }[] = [
  { text: 'Congratulations! You won a free voucher. Click the link to claim now', label: 'spam' },
  { text: 'Are you coming to the meeting tomorrow? Send me the notes', label: 'ham' },
  { text: 'URGENT: your account is locked. Verify your details at this link', label: 'spam' },
  { text: 'Happy birthday! Hope you have a great day, lunch tomorrow?', label: 'ham' },
  { text: 'Limited offer: free gift, reply YES to claim your prize', label: 'spam' },
  { text: 'Can you send me the link to the dashboard when it is ready?', label: 'ham' },
  { text: 'Your parcel is waiting. Pay the small fee at this link to reschedule delivery', label: 'spam' },
  { text: 'Running late, start without me. See you in class', label: 'ham' },
]
