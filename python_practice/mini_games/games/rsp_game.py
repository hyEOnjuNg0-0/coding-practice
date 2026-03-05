import random

select = ["가위", "바위", "보"]
computer = random.choice(select)

while True:
    user = input("가위 바위 보 중에 하나를 입력하세요.> ")
    if user in select:
        break
    print("잘못된 입력입니다. 다시 입력하세요.")

print(f"컴퓨터는 {computer} 를 냈습니다.")
print(f"당신은 {user} 를 냈습니다.")

if user == "가위" and computer == "보" or \
   user == "바위" and computer == "가위" or \
   user == "보" and computer == "바위":
    print("당신이 이겼습니다.")
else:
    print("당신이 졌습니다.")


# import random
#
# user = input("가위, 바위, 보 중 하나를 입력하세요: ")
# computer = random.choice(["가위", "바위", "보"])
#
# print("컴퓨터:", computer)
#
# if user == computer:
#     print("비겼어요!")
# elif (user == "가위" and computer == "보") or \
#      (user == "바위" and computer == "가위") or \
#      (user == "보" and computer == "바위"):
#     print("이겼어요!")
# else:
#     print("졌어요!")
