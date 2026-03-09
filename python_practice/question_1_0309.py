##################################################
### 03/09 Python 시험 1번 문제 '회원 관리 프로그램' ###
##################################################

def show_list():
    print('\n[1] 회원 추가')
    print('[2] 회원 조회')
    print('[3] 회원 통계')
    print('[4] 종료')

def add_user():
    # 회원 추가
    new_user = {}
    new_name = input('이름 : ')
    new_user['name'] = new_name
    try:
        new_age = int(input('나이 : '))
        new_attendence = int(input('출석일수 : '))

        new_user['age'] = new_age
        new_user['attendence'] = new_attendence
        users.append(new_user)

        print(f'\n{new_name} 회원이 추가되었습니다.')
    except ValueError:
        print('\n나이와 출석일수는 정수로 입력하세요.')

def search_user():
    # 회원 조회
    found = False  # 회원 존재 여부
    find_name = input('\n찾고자 하는 회원의 이름을 입력하세요. : ')

    for user in users:
        if user['name'] == find_name:
            print(f'\n{user['name']} 회원 -> 나이: {user['age']}, 출석일수: {user['attendence']}')
            found = True  # 일치하는 회원 찾으면
            break  # 반복문 종료

    if not found:
        print('\n일치하는 회원이 없습니다.')

def users_stat():
    # 회원 통계
    total_user_num = len(users)
    total_attendence_sum = 0
    for user in users:
        total_attendence_sum += user['attendence']

    if total_user_num == 0:
        print('\n등록된 회원이 없습니다.')
    else:
        attendence_avg = total_attendence_sum / total_user_num
        print(f'\n총 회원 수: {total_user_num}\n전체 출석일수 합계: {total_attendence_sum}\n평균 출석일수: {attendence_avg:.1f}')


users = []  # 모든 회원 리스트

while True :
    show_list()
    try:
        choice = int(input('메뉴에서 원하는 작업 번호를 선택하세요 : '))

        if choice == 1:
            add_user()

        elif choice == 2:
            search_user()

        elif choice == 3:
            users_stat()

        elif choice == 4:
            print('\n프로그램을 종료합니다.')
            break

    except ValueError:
        print('\n올바른 메뉴를 선택하세요.')



