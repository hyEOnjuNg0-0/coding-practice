# 수정한 사항
# 1. cardset() -> draw_card() 의미 잘 나타내려고
# 2. 변수명 snake_case 방식으로 (필수는 아닌데 파이썬 권장 규칙임)
# 3. 뒷 코드 '21 이하일 때' 조건문 안에 넣음
# 4. 카드 더 뽑는 부분에 while문 추가

# 수정할 사항
# 1. play() 함수로 묶기. 메인에서 원하는 위치에서 갖다쓰려고
# 2. 딜러도 카드 뽑아야 함
# 3. 게임 끝나고 더 할 건지 묻는 거 구조 고민

import random

class BlackJackDeck :
    def __init__(self):
        self.deck=[1,2,3,4,5,6,7,8,9,10,11] *4
        random.shuffle(self.deck)

    def draw_card(self):
        return self.deck.pop()
    
def blackjack():
    print("BlackJack")

    blackGame = BlackJackDeck()
    dealer_card = blackGame.draw_card() + blackGame.draw_card()
    first_hand = blackGame.draw_card()
    second_hand = blackGame.draw_card()

    print(f'첫번째 카드 : {first_hand}')
    print(f'두번째 카드 : {second_hand}')
    total = first_hand + second_hand

    if total > 21: # 21 넘으면 패배로 게임 끝
        print("Bust You Lose")
        return 0  # 패배
    elif total == 21:  # 21이면 승리로 게임 끝
        print("BLACKJACK YOU WIN")
        return 1  # 승리
    else:  # 21 이하면 선택 (카드 더 뽑을지 그만할 지)
        while True:
            choice = input('More Card? press yes : 1   no : any key ')

            if choice == "1":  # 카드 뽑기 선택
                new_card = blackGame.draw_card()  # 새 카드 뽑음
                total += new_card
                print(f'새로운 카드 : {new_card}')

                if total > 21:  # 21 넘으면 패배로 게임 끝
                    print("Bust You Lose")
                    return 0
                else: # 안 넘으면 다시 물음
                    continue

            else:  # 그만하기 선택 -> 딜러 카드 합과 비교
                break

        # 점수 계산
        print(f"딜러의 카드 합은 {dealer_card}입니다")
        print(f"당신의 카드 합은 {total}입니다")

        if total > dealer_card:
            print("당신의 승리입니다")
            return 1
        elif total < dealer_card:
            print("당신의 패배입니다")
            return 0

def play():
    win_count = 0
    lose_count = 0

    while True:
        result = blackjack()

        if result==0:
            lose_count += 1
        else:
            win_count += 1

        if input('한 판 더? press yes : 1   no : any key ') != '1':
            print('게임 종료')
            break

         


