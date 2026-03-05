# 수정한 사항
# 1. 카드 뽑은 뒤 딜러 21 넘으면 플레이어 승리, total 21이면 플레이어 승리
# 2. BlackJackDeck, BlackJack 클래스 분리
# 3. BlackJack에서 blackjack()과 play()로 분리
# (blackjack()은 게임 로직만, play()는 실제 플레이)
# (현재는 카드 뽑다가 21이 넘어도 '게임 뽑는 걸 묻는 while문 밖으로만' 나가서 카드 계산을 하고 있음 -> bust이므로 바로 게임이 끝나야 함)
# (blackjack()에서 return으로 게임 종료하도록 변경. 0 -> 패배로 종료, 1 -> 승리로 종료)
# 4. 점수 계산 부분 조건문 줄임 (최종 딜러 카드 합이랑만 비교하면 됨. 위에서 return으로 제어 중)
# 5. lose_count 식제, play_count 추가

# 수정할 사항(선택. 이대로 마무리해도 무방)
# 1. blackjack() 함수 분리
# 지금 blackjack() 내에 모든 게임 로직을 다 쑤셔넣어놨는데 하나의 함수에선 하나의 기능만 책임지도록 분리하면 좋음
# 예) 첫 카드 뽑기, 점수 비교, 플레이어 턴, 딜러 턴 등

import random

class BlackJackDeck :
    def __init__(self):
        self.deck=[1,2,3,4,5,6,7,8,9,10,11] * 4
        random.shuffle(self.deck)

    def draw_card(self):
        return self.deck.pop()

class BlackJack:
    def __init__(self):
        self.win_count = 0
        self.play_count = 0
        self.win_rate = 0

    # 블랙잭 로직
    def blackjack(self):
        print("\n < BlackJack > \n")

        deck = BlackJackDeck()  # 하나의 덱에서 진행

        dealer_card = deck.draw_card() + deck.draw_card()
        first_hand = deck.draw_card()
        second_hand = deck.draw_card()

        print(f'첫번째 카드 : {first_hand}')
        print(f'두번째 카드 : {second_hand}')
        total = first_hand + second_hand

        if total > 21:  # 21 넘으면 패배로 게임 끝
            print("\nBust You Lose\n")
            return 0
        elif total == 21:  # 21이면 승리로 게임 끝
            print("\nBLACKJACK! YOU WIN\n")
            return 1
        else:  # 21 이하면 선택 (카드 더 뽑을지 그만할 지)
            while True:
                choice = input('More Card? press yes : 1   no : any key')

                if choice == "1":  # 카드 뽑기 선택
                    new_card = deck.draw_card()  # 새 카드 뽑음
                    total += new_card
                    print(f'새로운 카드 : {new_card}')
                    if dealer_card < 13:  # 딜러도 13 안 넘으면 카드 뽑기
                        dealer_card += deck.draw_card()
                        print("딜러도 카드를 뽑았습니다.")
                        if dealer_card > 21:  # 딜러 21 넘으면 플레이어 승리
                            print('\n딜러 BUST 플레이어의 승리입니다!\n')
                            return 1
                        elif dealer_card == 21:  # 딜러 카드 합 21이면 플레이어 패배
                            print("\nDEALER BLACKJACK! YOU LOSE\n")
                            return 0

                    if total > 21:  # 21 넘으면 패배로 게임 끝
                        print("\nBust You Lose\n")
                        return 0
                    elif total == 21:
                        print("\nBLACKJACK! YOU WIN\n")
                        return 1
                    else:  # 안 넘으면 다시 물음
                        continue

                else:  # 그만하기 선택 -> 딜러 카드 합과 비교
                    break

            # 점수 계산
            print('----------------------------------')
            print(f"딜러의 카드 합은 {dealer_card}입니다")
            print(f"플레이어의 카드 합은 {total}입니다")
            print('----------------------------------\n')

            if total > dealer_card:
                print("플레이어의 승리입니다!\n")
                return 1
            elif total < dealer_card:
                print("플레이어의 패배입니다!\n")
                return 0

    # 실제 플레이 (blackjack() 함수 실행, 더 할 건지 선택, 승률 계산)
    def play(self):
        while True:
            self.play_count += 1  # 게임 판 수 +1
            result = self.blackjack()

            if result == 1:  # 승리로 게임 끝났으면 win_count +1
                self.win_count += 1

            # 다시 할것인가 묻는다
            do_or_not = input("한판더? press yes : 1   no : any key")
            if do_or_not != '1' :
                print('이용해 주셔서 감사합니다.')
                break

        self.win_rate = (self.win_count/(self.play_count + 0.00001))*100
        print(f"플레이어 승률 : {self.play_count}판 중 {self.win_rate:.1f}%")


# # 플레이 테스트
# BlackJack().play()