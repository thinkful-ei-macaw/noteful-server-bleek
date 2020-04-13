INSERT INTO folders (id, name)
VALUES
  ('6968f2ae-29eb-4898-8470-0e874be1bb02', 'Thoughts'),
  ('bc1473e0-1832-4469-ae7e-65aec03e7cfa', 'Songwriting'),
  ('64ca257d-a718-47cc-b018-413d9b20c82a', 'Ideas');

INSERT INTO notes (id, name, content, folder_id)
VALUES
  ('2e81d500-b0fe-48a2-b1ec-e53353232bd7', 'Thought 1', 'This is a thought!', '6968f2ae-29eb-4898-8470-0e874be1bb02'),
  ('cc861e79-ead7-4ca2-ae53-c706874d2365', 'Thought 2', 'This is another thought!', '6968f2ae-29eb-4898-8470-0e874be1bb02'),
  ('ddc9b319-6acb-4ea6-9cd1-a8e131ebabf6', 'Song 1', 'This is a song!', 'bc1473e0-1832-4469-ae7e-65aec03e7cfa'),
  ('e62b505f-a2b7-470f-a341-e6a7dec8cf25', 'Song 2', 'This is another song!', 'bc1473e0-1832-4469-ae7e-65aec03e7cfa'),
  ('28d71eab-bd4a-4c97-924c-46117f91942c', 'Idea 1', 'This is an idea!', '64ca257d-a718-47cc-b018-413d9b20c82a'),
  ('a6437120-822f-4b51-a2bf-5247936af883', 'Idea 2', 'This is another idea!', '64ca257d-a718-47cc-b018-413d9b20c82a');