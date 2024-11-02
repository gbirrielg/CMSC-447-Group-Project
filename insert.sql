INSERT INTO users (username, password, is_admin) VALUES
('admin', 'admin', true);

INSERT INTO cards (username, type, theme, option_1, date_time) VALUES
('admin', 'TRU', 'Philosophical', 'If you could change one thing about the world, what would it be?', CURDATE()),
('admin', 'TRU', 'Basic', "What is the most ridiculous thing you've ever believed?", CURDATE()),
('admin', 'TRU', 'Personal', 'What is your biggest fear?', CURDATE()),
('admin', 'TRU', 'Personal', 'What is your biggest regret?', CURDATE()),
('admin', 'TRU', 'Basic', 'If you could trade places with anyone for a day, who would it be and why?', CURDATE()),
('admin', 'TRU', 'Embarrassing', "What is the most embarrassing thing you've ever done?", CURDATE());

INSERT INTO cards (username, type, theme, option_1, date_time) VALUES
('admin', 'DAR', 'Basic', 'Hold an ice cube in your hand until it melts.', CURDATE()),
('admin', 'DAR', 'Embarrassing', 'Do your best impression of a celebrity.', CURDATE()),
('admin', 'DAR', 'Embarrassing', 'Wear something silly for the rest of the game.', CURDATE()),
('admin', 'DAR', 'Embarrassing', 'Create a new dance move.', CURDATE()),
('admin', 'DAR', 'Food', 'Eat a spoonfull of hot sauce.', CURDATE());

INSERT INTO cards (username, type, theme, option_1, option_2, date_time) VALUES
('admin', 'WYR', 'Basic', 'Be extremely wealthy', 'Be extremely intelligent', CURDATE()),
('admin', 'WYR', 'Basic', 'Be able to travel back in time', 'Be able to travel forward in time', CURDATE()),
('admin', 'WYR', 'Basic', 'Be able to eat any food without gaining weight', 'Never get hungry', CURDATE()),
('admin', 'WYR', 'Basic', 'Be incredibly popular', 'Be incredibly wealthy', CURDATE()),
('admin', 'WYR', 'Basic', 'Be able to control the weather', 'Be able to communicate with animals', CURDATE()),
('admin', 'WYR', 'Basic', 'Never be able to eat spicy food', 'Never be able to eat sweet foods', CURDATE());