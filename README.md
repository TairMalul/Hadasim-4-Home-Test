# Hadasim-4-Home-Test
**
חלק ראשון - מערכת ניהול קורונה

אופן השימוש:

התחיל מהתפריט ודף הבית:
![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/c515d7a2-007e-4aca-b95f-5b935853ac28)

בדף הבית ניתן לראות תצוגה סיכומית בנושא הקורונה (בונוס מס' 3) - כמות המחוסנים מבין חברי הקופה, כמה התחסנו בכל מנת חיסון וכן כמה חולים מאומתים היו בכל יום ב-30 הימים האחרונים.
למעלה, ניתן להבחין בתפריט. בלחיצה על חברי הקופה-
![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/b8071d05-3f88-4f89-9e46-57da311d6eaa)
יועבר המשתמש לחלון המכיל רשימה שמית של חברי הקופה בצרוף תעודת זהות. 
![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/d50028d6-080d-479c-b3b6-078e7aade0d3)
בשורת החיפוש ניתן להזין שם / חלק משם או תעודת זהות של חבר מסוים כדי להקל על מציאתו

![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/ca461ef7-72fd-411a-a91a-1976c69e0166)

לחיצה על סימן ה- + בקצה השורה של כל חבר, יוביל לפתיחת חלון המכיל את נתוניו האישיים, תמונתו (בונוס 1) והיסטוריית הקורונה שלו:
![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/4697d424-e6e7-44e2-b386-bd6114b8b54d)

בתחתית החלון ניתן להבחין בכפתורים עדכון ומחיקה. בלחיצה על כפתור המחיקה, יוצג פרומפט המוודא את הפקודה ותתבצע מחיקת החבר מהמערכת.
בלחיצה על עדכון יועבר המשתמש לחלון עדכון בו יוכל לשנות ולהוסיף נתונים:
![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/ba39aa0f-8f17-483e-abd7-80d03e3c0fc1)

סימון התיבה לצד כל חיסון תפתח שדות למילוי הפרטים הרלוונטוים, וכך גם לגבי עדכון תקופת חולי.
![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/a25750b0-9cc8-4f30-861a-b23e7e13536f)

לסיום יש ללחוץ על שליחה, ואם הכל בסדר גמור יקבל המשתמש את ההודעה:עודכן בהצלחה.

נחזור לתפריט.
בלחיצה על כפתור הוספת חבר-
![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/d1ec7775-6ef4-4029-ab45-d24ec24da3fb)
יועבר המשתמש לחלונית המאפשרת הוספת חבר חדש על כל פרטיו:
![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/bc3edc0f-7015-4bb9-b217-e79347c2109b)
לאחר מילוי הפרטים וביצוע שליחה תוצג ההודעה "נוסף בהצלחה" למשתמש.

תלויות חיצוניות:

צד השרת כתוב בפייתון - שרת flask, צד הלקוח כתוב באנגולר database הוא MongoDB.

נתחיל בשרת:
יש להוריד את התקייה "MacabiHadasim" הנמצאת ב: "Coronas_Managment_Service/server-python" ולפתוח אותה מומלץ באמצעות PyCharm:

![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/5d5b9f7f-19dd-44be-accf-8b77d1bbcafd)
![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/ac44bb6e-1728-4bbb-b6b4-4996eb35c225)
יש להתקין את הספריות הבאות על הinterpeter שמריץ את הפרויקט:

flask, flask-cors, pymongo, pillow, dataeutil
לאחר מכן יש להריץ את הקובץ server.py:


![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/9e48b9e2-4414-4255-9ed0-071ca975e6e8)

נעבור לצד הלקוח. יש צורך ב-VScode ובnodeJS. 
אחרי ששני אלה מותקנים יש לפתוח את הטרמינל ולהריץ את הפקודה: npm install -g @angular/cli ובכך להתקין אנגולר. 
לאחר מכן יש להריץ את הפקודה: ng new MacabiHadasim שתיצור פרויקט אנגולר חדש בשם MacabiHadasim. 
בפרויקט שנוצר יש להחליף את תקיית ה-src בתקייה src שנמצאת בניתוב: "Corona_Managmet_System/client-angular" ולאחר מכן לפתוח את terminal באופן הבא:
![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/b8edea47-681d-4916-a9bb-5aa09ba8c70b)

להתקין angular charts באמצעות הרצת הפקודות הבאות:

npm install @canvasjs/angular-charts

npm install @syncfusion/ej2-ng-charts


ולהריץ את הפקודה ng s -o כדי להריץ את הפרויקט:![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/3facde17-ae50-42b5-ab27-28862a1bf7a1)

כעת הפרויקט אמור להיפתח בדפדפן.


 מסד הנתונים: 
 
 יש צורך להתקין mongoDb ולוודא שהLocalhost הוא 27017:
 ![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/56749c1f-057c-468c-88c3-298ebaef6493)

אין חובה להתקין את מסד הנתונים, בעת הוספת חברים חדשים הוא נוצר אוטומטית,  עם זאת כדי לטעון נתונים לדוגמה יש לבצע את התהליך הבא:

תחילה יש להתקין Studio3T: ![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/bdb0895e-7058-4d71-a057-4c26256423d1)


 בתקייה "Corona_Managment_System/database" מופיעים 3 קבצי json במהווים את 3 טבלאות הdataBase. את הטבלאות ניתן לטעון למסד הנתונים באופן הבא: יש ליצור dataBase ריק ולהתחבר אליו באמצעות Stodio3T. 

![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/569fb9c4-a521-495e-bc6c-8a917df9ff4d)

יש לעמוד על מסד הנתונים הרצוי וללחות בתפריט הכותרת על database ואז על import collection:

![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/084f82e3-709b-434b-bf3e-52bdf59188a7)


יש לבחור json כסוג הקובץ המועלה:

![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/c8edcd33-8069-421f-882c-cfe200a7f67b)


ואז נפתחת החלונית הבאה:

![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/dad9525f-f45b-4af9-b9d5-ee1cd63ec0bf)

יד ללחוץ על Add Source ולהעלות את 3 הקבצים: 

![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/8026aadb-5705-4e74-8f76-bcedfd7012af)

ולסיום ללחוץ על run - ![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/4d6f5346-ae0e-417f-aff6-fc5bd1aaedae)

לאחר ההעלאה נוכל לראות את הטבלאות בתפריט השמאלי:

![image](https://github.com/TairMalul/Hadasim-4-Home-Test/assets/118104637/9969aa29-640e-4faf-967b-795fbbfd2ed0)


--סוף קובץ--




