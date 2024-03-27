

import re
from dateutil.parser import parse



class Validators:

    @staticmethod
    def validId(num):
        if len(num) != 9:
            return False
        else:
            number = int(num[-1])  # חלץ ספרת ביקורת
            for i in num[-2::-2]:  # הכפלה ב2 לכל ספרה שניה
                i = int(i) * 2
                if i > 9:
                    i -= 9
                number += i
            for i in num[-3::-2]:
                number += int(i)
            if number % 10 == 0:
                return True
            else:
                return False

    @staticmethod
    def validPhoneNumber(num):
        return re.match('^[0-9]*$',num)!=None

    @staticmethod
    def validName(name):
        return re.match("^[A-Za-z0-9_-]*$",name)==None

    @staticmethod
    def validAddress(address):
        return re.match('^[a-zA-Z]*$',address)==None

    @staticmethod
    def is_date(string, fuzzy=False):
        try:
            parse(string, fuzzy=fuzzy)
            return True

        except ValueError:
            return False
