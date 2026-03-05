import user
from games import fortune_game, updown_game, blackjack

user_manager = user.user_manager  # user.py에서 만든 객체 그대로 사용 (기능들이 그 전역객체를 참조하고 있기 때문)

def home_page():
    print('\n🎮 ========================================🎮')
    print('|      미니 게임 나라에 오신 걸 환영합니다🎈      |')
    print('🎮 ========================================🎮')

    print('\n<----- ☰ 메뉴 ☰ ----->')
    print('1. 게임 플레이')
    print('2. 마이페이지')
    print('3. 회원 가입')
    print('4. 회원 삭제')
    print('0. 미니 게임 나라 종료')

def show_game_list():
    print('\n----- 📌미니 게임 목록 -----')
    print('1. 오늘의 운세')
    print('2. 숫자 Up Down')
    print('3. 블랙잭')
    print('4. 게임4')
    print('0. 홈으로 돌아가기')

# 유저 정보 보여주기
def show_user_info(user_id):
    selected_user = user_manager.get_user(user_id)  # 아이디에 해당하는 User 객체
    print('\n---------- 회원 정보 ----------')
    print('\tNAME | ', selected_user.name)
    print('\tID | ', selected_user.user_id)
    print('\n------------------------------')

# 로그인
def log_in(user_id):
    selected_user = user_manager.get_user(user_id)  # 아이디에 해당하는 User 객체
    while True:
        input_pw = input('비밀번호를 입력하세요 : ')
        if selected_user.pw == input_pw:
            break
        else:
            print('잘못된 비밀번호입니다.')
            continue

def main():
    while True:
        home_page()
        choice = input('메뉴에서 원하는 작업 번호를 선택하세요 : ')

        # 게임 선택
        if choice == '1':
            while True:
                show_game_list()
                game_choice = input('원하는 게임의 번호를 선택하세요 : ')

                if game_choice == "1":
                    fortune_game.TheFortune().play()
                elif game_choice == "2":
                    updown_game.UpDown().play()
                elif game_choice == "3":
                    blackjack.BlackJack().play()
                elif game_choice == "4":
                    print('4번 게임 선택')
                elif game_choice == "0":
                    print('\n > > > 홈으로 돌아갑니다')
                    break
                else:
                    print('잘못된 입력입니다.')
                    continue

        # 마이페이지 선택
        elif choice == '2':
            print('\n\t > > > 마이페이지로 이동')
            user_id = input('\n본인의 아이디를 입력하세요.')
            if user.check_exist_user(user_id):  # 존재하는 회원이면
                log_in(user_id)  # 로그인
                show_user_info(user_id)  # 회원정보 출력
            else :
                print('\n회원 가입이 먼저 필요합니다')


        # 회원가입 선택
        elif choice == '3':
            print('\n\t> > > 회원가입 화면으로 이동\n')

            # id 입력
            while True:
                input_id = input('ID 입력 : ')
                if user.check_exist_user(input_id):  # 동일 id의 회원이 이미 있으면
                    print('존재하는 아이디입니다')
                else:  # 동일 id의 회원이 없으면
                    break

            # 비밀번호, 이름 입력
            input_pw = input('pw 입력 : ')
            input_name = input('이름 입력 : ')

            # 새로운 회원 생성 (새 User 객체 싱성)
            user.signin(input_id, input_name, input_pw)
            print('\n🎊미니 게임 나라 회원이 되신 걸 환영합니다🎊 홈 화면으로 이동합니다.')

        # 기존 회원 삭제
        
        elif choice == '4':
            print('\n> > > 회원 삭제 < < <')
            input_id = input('삭제 id : ')
            # 회원 존재 여부 확인
            if user.check_exist_user(input_id):
                # 비밀번호 확인
                log_in(input_id)
                if user.user_manager.delete_user(input_id):
                    print('회원 삭제 완료.')
                else:
                    print('회원 삭제 실패!')
            else:
                print('존재하지 않는 아이디입니다.')

        # 종료 선택
        elif choice == '0':
            print('\n\n> > > 미니 게임 나라를 종료합니다 < < <')
            print('=======================================')
            print('                               madeby.HJ, . . .')
            break
        else:
            print('잘못된 입력입니다.')
            continue


if __name__ == '__main__':
    main()
