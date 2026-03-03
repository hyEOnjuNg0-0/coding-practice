# 게임시작 - 숫자 랜덤 뽑기, 시작 멘트
# 답 input으로 받기
# 숫자가 1~100사이가 아니면 '다시 입력'
# #up&down 알려주고 맞으면 정답처리
import random

class UpDown:
    def __init__(self):
        pass

    def play(self):
        self.correct = random.randint(1, 100)
        while True:
            guess = int(input('1~100 사이 정수를 입력하세요'))
            if guess > 100 or guess < 1:
                print('1~100사이로 다시 입력하세요!')

            elif guess < self.correct:
                print('UP')

            elif guess > self.correct:
                print('DOWN')

            elif guess == self.correct:
                print('!!!~정답입니다~!!!')
                break