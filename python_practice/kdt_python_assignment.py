# '점프, 투 파이썬' p.386~p.392 문제 풀이

# 1. 문자열 바꾸기
s = "a:b:c:d"
result1 = "#".join(s.split(":"))
print('1번 결과 : ', result1)


# 2. 딕셔너리 값 추출하기
a2 = {'A':90, 'B':80, 'C':70}
print('\n2번 결과 : ', a2['C'])


# 3. 리스트의 더하기와 extend 함수
print('\n3번 답 : +는 새로운 리스트를 생성해서 반환, extend는 기존 리스트를 변경')


# 4. 리스트 총합 구하기
A4 = [20, 55, 67, 82, 45, 33, 90, 87, 100, 25]
result4 = sum(score for score in A4 if score >= 50)
print('\n4번 결과 : ', result4)


# 5. 피보나치 함수
# 입력을 정수 n으로 받았을 때 n항 이하까지의 피보나치 수열 출력하는 함수 작성
def fibonacci(n):
    if n <= 0:
        print("양의 정수를 입력하세요.")
        return
    elif n == 1:
        print('5번 결과 : ', [0])
        return
    elif n == 2:
        print('5번 결과 : ', [0, 1])
        return

    result = [0, 1]  # 첫 두 항

    for i in range(2, n):
        result.append(result[i - 2] + result[i - 1])

    print('\n5번 결과 : ', result)

fibonacci(10)


# 6. 숫자의 총합 구하기
a6 = input('\n6번. 숫자 입력 : ').split(",")  # 문자열 ,를 구분자로 스플릿 (리스트)
result6 = sum(map(int, a6))  # 리스트에 있는 값들 int로 변환해서 합
print('6번 결과 : ', result6)


# 7. 한 줄 구구단
a7 = int(input('\n7번. 구구단을 출력할 숫자를 입력하세요(2~9)'))
print(f'7번 결과 : {a7 * 1} {a7 * 2} {a7 * 3} {a7 * 4} {a7 * 5} {a7 * 6} {a7 * 7} {a7 * 8} {a7 * 9}')


# 8. 파일을 읽어 역순으로 저장하기
with open("abc.txt", "r", encoding="utf-8") as f:
    lines8 = f.readlines() # 리스트

reversed_lines = lines8[::-1]

with open("abc.txt", "w", encoding="utf-8") as f:
    f.writelines(reversed_lines)


# 9. 평균값 구하기
with open("sample.txt", "r", encoding="utf-8") as f:
    lines9 = f.readlines()

nums9_sum = sum(map(int, lines9))
nums9_avg = nums9_sum / len(lines9)

with open("result.txt", "w", encoding="utf-8") as f:
    f.writelines(str(nums9_avg))


# 10. 계산기 만들기
class Calculator:
    def __init__(self, nums):
        self.nums = nums

    def sum(self):
        print('\n10번 결과 sum', sum(self.nums))

    def avg(self):
        print('\n10번 결과 avg', sum(self.nums)/len(self.nums))

cal1 = Calculator([1, 2, 3, 4, 5])
cal1.sum()
cal1.avg()


# 11. 모듈을 사용하는 방법
'''
1. 코드에서 sys.path 지정
import sys
sys.path.append('/path/doit')  # 디렉토리 경로

'''


# 12. 오류와 예외 처리
'''
실행 결과 : 3
[1, 2, 3][3]의 의미는 [1, 2, 3] 리스트의 4번째(인덱스 3번)값이라는 의미이다.
그러나 리스트에는 값이 3개밖에 없으므로 인덱스 에러가 발생한다.
첫 줄에서 에러가 발생했으므로 프로그램이 종료되어 아래 코드는 실행되지 않는다
'''


# 13. DashInsert 함수
def DashInsert():
    nums = input('\n13번. 숫자들 입력 : ')
    if not nums:
        return ""

    result = nums[0]  # 첫 문자부터 시작

    for i in range(1, len(nums)):
        n1 = int(nums[i - 1])
        n2 = int(nums[i])

        if n1 % 2 == 1 and n2 % 2 == 1:  # 둘 다 홀수면
            result += '-' + nums[i]
        elif n1 % 2 == 0 and n2 % 2 == 0:  # 둘 다 짝수면
            result += '+' + nums[i]
        else:
            result += nums[i]
    return print('\n13번 결과 : ', result)

DashInsert()

# 14. 문자열 압축하기 (문자열 입력받아 같은 문자가 연속적으로 반복되면 그 반복 횟수를 표시해 문자열 압축 ex. a3b2c4a1)
def ZipInsert():
    s = input('\n14번. 문자열 입력 : ')

    if not s:
        return ""

    result = ""  # 압축 결과
    count = 1  # 중복 카운트

    for i in range(1, len(s)):
        if s[i] == s[i - 1]:  # 연속 문자 중복이면
            count += 1  # +1
        else: # 연속된 문자 끝
            result += s[i - 1] + str(count)  # 문자와 중복 횟수 result에 저장
            count = 1  # 카운트 초기화

    # 마지막 문자 처리
    result += s[-1] + str(count)

    print('\n14번 결과 :', result)

ZipInsert()


# 15. Duplicate Numbers 함수
# 0~9로 된 숫자 입력 받았을 때 이 입력값이 0~9의 모든 숫자를 각각 한 번씩만 사용한 건지 확인하는 함수
# 입력 구분 : 띄어쓰기
# 입력 : 0123456789 01122 8201902 78304
# 결과 : True False False True
def DuplicateNumbers():
    nums = input('\n15번. 입력 : ').split(" ")  # 띄어쓰기 기준으로 나누기

    results = []

    for num_str in nums:
        count = [0] * 10  # 0~9 개수 카운트하는 리스트 초기화
        for char in num_str:  # 문자 하나씩 탐색
            count[int(char)] += 1

        is_unique = all(c <= 1 for c in count)  # 하나라도 나타난 횟수가 1 초과인 숫자가 있다면 False
        results.append(is_unique)

    print('15번 결과 :', results)

DuplicateNumbers()



