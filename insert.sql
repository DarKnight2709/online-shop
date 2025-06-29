-- INSERT DATA
-- ========================
-- Insert Brands
-- ========================
INSERT INTO Brands (name) VALUES
  ('Dell'),         -- 1
  ('Lenovo'),       -- 2
  ('HD Pro'),       -- 3
  ('Canon'),        -- 4
  ('Nikon');        -- 5

-- ========================
-- Insert Categories
-- ========================
INSERT INTO Category (name) VALUES
  ('Laptops'),      -- 1
  ('Desktops'),     -- 2
  ('Cameras'),      -- 3
  ('Accessories');  -- 4

-- ========================
-- Insert Products
-- ========================
INSERT INTO Products 
    (productName, description, price, quantityInStock, imageURL, brandID, categoryID)
VALUES
-- Dell (Laptop + Desktop)
('Dell Inspiron 14', '14-inch laptop with Intel i5, 16GB RAM, 512GB SSD', 699.99, 20, 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQO0-yB3fxW0EEZQXCqD0cNDI51JXiyUfe_YYdV3L1fWG2Xn7AMsxI4V8xDWXG1vykxQdjih9mesAVfa7waO2VHaPVtYBc3f-w77PHkxXJt6og0z459FJ_iSiJVAiv5cQ3QqnGtK79jvA&usqp=CAc', 1, 1),
('Dell XPS 13', 'Premium laptop with Intel i7, 32GB RAM', 1199.00, 12, 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQIcBHpx7VslCgTkQiOaxVCe_kl4QbrJwhwEDLdi9KzNI2BGAtGebWuQa4lxV4AQrgkmA8CXsBy5uYSaPR1S9ivUm7EZdw2bPjvjTyklw8X6hY_pPXJcgoAD_xAX04PFkxc6-6xCu0G5A&usqp=CAc', 1, 1),
('Dell OptiPlex 5080', 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRrI0cfywWx9EK0RdKx5G3HjRQ862apTT_vbS_GjqMFt6RGYiigPIcMpke8L3ttRbIXHZkuD2gM2T_p6RFh2L6u5yTbLOO8w9ECpZwkoKsUGL1UDOO0fIvEnBPG-G44zHadQp3ahjWwXgg&usqp=CAc', 1, 2),

-- Lenovo (Laptop + Desktop)
('Lenovo ThinkPad X1', 'Business laptop with Core i7, 1TB SSD', 1399.00, 15, 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSj0jUmugkT8ve-EpaGoNDDIhBQ18Chnsm3iURQ1NUXQHW8brO6rBxTZM5PjJkl3eayqkhbSl6H4EOhJCq1Tf9rtNaDW24kuxHVCkWn5GFyu7BX9QK6yhNd_Rsp5VEdbD172aZOIViUeOs&usqp=CAc', 2, 1),
('Lenovo Legion 5', 'Gaming laptop with Ryzen 7, RTX 4060', 1599.00, 8, 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpxyWw7LUFnlfD1Bn8TBT-5kdIvo-KfCCVMxI-RVYdX20tWd-zFqVedSYphpnpy5ykPi33bPaY2eLl2yFUlYXTuadf1Wk8uZruIOgHZkDO0tfavFVBt0NaQ8BmfzgPqfeRBQhchWURWfE&usqp=CAc', 2, 1),
('Lenovo IdeaCentre 5', 'Budget desktop with Ryzen 5', 599.00, 18, 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSoPHR0Y8mZQlctPSqu4kPAwdgRFoL09wT6BMlko7qO5f6fZNIMoPPqvjCG1YjoQ3vx61-p5m_1msa4MzHBmn-COowcbRkPXvATxW7D75ke0p11m98fI5397wd334ipdwt5Fu4F1q8&usqp=CAc', 2, 2),

-- Cameras (HD Pro, Canon, Nikon)
('HD Pro Action Cam 4K', 'Waterproof action camera, 4K60 video', 249.00, 30, 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ55wQ0Mu-jNLy5HN7A0X6rWi2UiLLZXVmeR-ufXZZk3g9dUc5YTVSTJxfD9D-Wlks2QEXZUHsDb2xMokoiU0lnhjRUSPPgENjTiUe_S3Cq', 3, 3),
('Canon EOS M50 II', 'Mirrorless camera 24MP, 4K video recording', 699.00, 10, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMQ9V65ivFukwS5tyr9rdVpDleec4215v7KQ&s', 4, 3),
('Nikon D5600', 'DSLR camera 24MP + 18-55mm lens', 699.00, 6, 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTOmqZhJFwy0yMbUjvKzmCLlQsLlQs9dgEBttG5Uedhs3R8Bv4vDN-7j6q-X2KuznUBVYP8OPBTtUV6mIlT86K03wEV_Ll86hq7Hzzq9msqlW4Y0aX3PJpZIg', 5, 3),

-- Accessories (Webcam, Mouse, Keyboard, etc.)
('HD Pro Webcam HD', 'HD webcam with built-in microphone', 89.00, 40, 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRBQxKStqdoqbyfIfG0BKmBtHGTLeNIhvFi2pjOBTxCoog85W3EWPt4VixlxLvbeiIOfYNqi4vVqocE41DFJjzeXrXNm9t5ZaOseq_V7Xu1_rdrqxXbwbE', 3, 4),
('Dell Wired Mouse', 'Official Dell USB wired mouse', 15.00, 100, 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRBKJAU2Bcfw-yIrPib07Yvoku5SUYm3xAudGu6P0gVV1pIqFTH_SjYCiRL_4SzoZSBIgFuMYZEPdJ1_VxC-Be01DyjTdjHbY3iDwzQyFtT1OTzf_cybc6eUw', 1, 4),
('Lenovo Wireless Keyboard', 'Slim and lightweight wireless keyboard', 29.00, 50, 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRMkI5SM7RUvgU1cRyMQBQQO0mBexFEvWfqzjIvqhCXl3XOUVVsPQ_ditPqxQ1AoHc9WqqBk1Ej5I1SgpyMPyvHUpvqUCTg4FTHR81IdG9frGNUoabjd8OG', 2, 4),
('Canon Tripod Stand', 'Sturdy tripod for Canon/Nikon cameras', 35.00, 25, 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS-bfliwDIeHJOZLhhSSqZ8YlNqco1xAjS2LiQ19-rc3kVC_qMPSnd4plRyudfPljJ20eXT4UGaxaHXAC2hqgYroyN8GL_UVar2tUm3wu5mjYTxmH7mEZjL', 4, 4),
('Nikon Camera Bag', 'Professional camera bag for Nikon', 49.00, 15, 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSO4OYhqeG3FFBKZTnySZLlN0wePKnSaCUJCu4Mpn8NRkKF8_LQTqvsmpcUkqiJFxfwRI3QBjmSrQWtzfCWYbjzQBcREIgKh-VgsF8uST33l7t76CcuRatLeQ', 5, 4),
('HD Pro SD Card 128GB', 'High-speed memory card for HD Pro cameras', 19.00, 60, 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSOaYeyyJ1bp0lrkE74t0H_CHKbfyGLbckhRXmEcHJkBlkhA0PrwxvAtohd154QAIbpsGphMoqnX98LXhop0nxrqluXPj1zhpr-OMu4NrTIszpEc32GTMrYvQ', 3, 4);
