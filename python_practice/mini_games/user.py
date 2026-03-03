# 회원 관리
# 기능 : 회원가입, 회원정보 수정, 회원탈퇴, 로그인, 로그아웃

# 회원 클래스 (회원 정보 구조)
class User:
    def __init__(self, user_id, user_name, password, user_type):
        self.user_id = user_id
        self.name = user_name
        self.pw = password
        self.user_type = user_type
        self.total = 0             # 플레이 수
        self.wins = 0              # 이긴 게임 수

# 회원 관리 클래스
'''
회원 가입시 UserManger의 users에 회원들 저장됨
UserManger.users : 딕셔너리. user_id를 키값으로 User 객체들을 저장
{
    'user_id1': <User 객체>,
    'iser_id2': <User 객체>,
    ...
}
'''
class UserManager:
    def __init__(self):
        self.users = {}

    # 회원 생성 (CREATE)
    def create_user(self, user_id, user_name, password, user_type):
        if user_id in self.users:  # 기존 회원인 지 확인
            return False
        self.users[user_id] = User(user_id, user_name, password, user_type)
        return True

    # 회원 정보 가져오기 (READ)
    def get_user(self, user_id):
        return self.users[user_id]

    # 회원 정보 업데이트 (UPDATE)
    def update_info(self, user_id, ischange_name, new_name, ischange_pw, new_pw, play, win):
        user = self.users[user_id]
        if user_id not in self.users: 
            return False

        # 이름 변경
        if ischange_name:
            user.name = new_name
        
        # 비밀번호 변경
        if ischange_pw:
            user.pw = new_pw

        # 게임 플레이 시 total +1
        if play:
            user.total += 1
            # 승리 시 wins +1
            if win:
                user.wins += 1

        return True

    # 회원 삭제 (DELETE)
    def delete_user(self, user_id):
        if user_id in self.users:
            del self.users[user_id]
            return True
        return False

# UserManager 인스턴스
user_manager = UserManager()

# 회원 가입
def signin(user_id, user_name, pw, user_type):
    return user_manager.create_user(user_id, user_name, pw, user_type)

# user_id 존재 여부 확인
def check_exist_user(user_id):
    return user_id in user_manager.users