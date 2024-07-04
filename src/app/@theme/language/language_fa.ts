import { Language } from './language';

export class LanguageFA extends Language {

	public static persianFigures = { 0: '۰', 1: '۱', 2: '۲', 3: '۳', 4: '۴', 5: '۵', 6: '۶', 7: '۷', 8: '۸', 9: '۹' };


	AND = "و";
	OR = "یا";
	Follow = "فالوو";
	Follower = "فالوور";
	Like = "لایک";
	Comment = "کامنت";
	Also = "همچنین";
	Done = "ثبت";
	Delete = "حذف";
	Order = "سفارش";
	Error = "خطا";
	Warning = "هشدار";
	Notification = "پیام";
	Notice = "اطلاع";
	Download = "دانلود";
	Description = "توضیحات";
	Optional = "اختیاری";
	Mandatory = "اجباری";
	Parameter = "پارامتر";
	Type = "نوع";
	Response = "پاسخ";


	Error_No_Internet = "دسترسی به اینترنت وجود ندارد!";
	Error_Not_Connected = "سرور در دسترس نیست!";
	Error_Unknown = "خطای نامشخص";
	Footer_Link_Privac_Policy = "سیاست نامه حریم خصوصی ";
	Footer_Link_ContactUs = "ارتباط با ما ";
	Footer_Copyright = "کلیه حقوق این سایت متعلق به گروه آیوُ‌ داینامیک می‌باشد";
	Footer_Copyright_Name = "IODynamic© 2022";

	Menu_Home = "خانه";
	Menu_Login_Application = "ورود به اپليکيشن";
	Menu_Login_Application_Followergir = "فالوورگير اينستاگرام";
	Menu_Login_Application_Membergir = "عضوگير تلگرام";
	Menu_Application_Info = "اطلاعات برنامه‌ها";
	Menu_Application_Followergir = "فالوورگير اينستاگرام";
	Menu_Application_Membergir = "عضوگير تلگرام";
	Menu_Application_Dubsman = "دابسمن";
	Menu_Application_MobileBank = "همراه بانک";
	Menu_Shop = "فروشگاه";
	Menu_ContactUs = "ارتباط با ما";
	Menu_Setting = "تنظيمات";


	Home_Page_Title = "خانه - وبسایت IODynamic";
	Home_Title = "گروه IODynamic";
	Home_Projects = "پروژه‌ها";
	Home_Followergir_AppName = "فالوورگير اينستاگرام";
	Home_Followergir_Explain = "با برنامه فالوورگير اينستاگرام می‌توانید فالوور، لايک و کامنت‌هاي خودتون رو به صورت رايگان و یا با خرید افزايش بديد، این برنامه با قابلیت اجرا در پلتفرم‌های مختلف است؛ اگر به دنبال محبوبيت سريع هستيد، اين برنامه مورد نياز شماست";
	Home_Followergir_Button = "دانلود";
	Home_Followergir_Button_Get_Follower = "ثبت سفارش";
	Home_Followergir_Button_Login_Panel = "ورود به پنل";
	Home_Membergir_AppName = "عضوگير تلگرام";
	Home_Membergir_Explain = "عضوگير تلگرام اين امکان رو ميده تا تعداد ممبر و بازديد پست‌هاي کانال و گروه تلگرامي رو به رايگان و یا با خرید افزايش بديد، با عضوگير تلگرام ممبرهاي کانال و گروه خود رو سريعا افزايش بديد";
	Home_Membergir_Button = "دانلود";
	Home_Membergir_Button_Get_Member = "ثبت سفارش";
	Home_Membergir_Button_Login_Panel = "ورود به پنل";
	Home_Dubsman_AppName = "دابسمن";
	Home_Dubsman_Explain = "اگر ميخواهيد ويديوهاي خنده‌دار و بامزه بسازيد، دابسمن برنامه مورد نياز شماست که قابليت دوبله، خوانندگي و ساخت دابسمش رو داره و باعث ميشه کلي اوقات خوش با دوستان و خانواده داشته باشيد";
	Home_Dubsman_Button = "مشاهده پروژه";
	Home_MobileBank_AppName = "همراه بانک";
	Home_MobileBank_Explain = "همراه بانک، به شما کمک مي‌کند تا کارت‌ها و پيامک‌هاي بانکي خود را مديريت کنيد و عمليات‌هاي بانکي را با گوشي انجام دهيد و ديگر نيازي به حمل کردن کارت‌ها نداشته و تمام اطلاعات همواره در اختيار شماست";
	Home_MobileBank_Button = "مشاهده پروژه";
	Home_Ability_Header = "چرا آيو دايناميک؟";
	Home_Ability_1_Title = "سريع";
	Home_Ability_1_Message = "سرعت برنامه‌ها سريعتر از هر برنامه ديگري است";
	Home_Ability_2_Title = "بهترين طراحي";
	Home_Ability_2_Message = "برنامه‌ها از بهترين طراحي استفاده مي‌کنند و به شما اين امکان را مي‌دهند تنظيمات دلخواه خود را شخصي‌سازي کنيد";
	Home_Ability_3_Title = "امن";
	Home_Ability_3_Message = "برنامه‌ها اطلاعات شما را از حملات هکرها در امان نگه مي‌دارد";
	Home_Ability_4_Title = "رابط کاربري دوستانه";
	Home_Ability_4_Message = "رابط کاربري اينقدر ساده است که شما از قبل مي‌دانيد که چگونه از آن استفاده کنيد";
	Home_Ability_5_Title = "دسترسي API";
	Home_Ability_5_Message = "قابلیت دسترسی رابط برنامه‌نویسی کاربردی برای کاربران";
	Home_Ability_6_Title = "پشتيباني";
	Home_Ability_6_Message = "پشتيباني و رفع اشکالات و تغييرات مورد نظر کاربران";
	Home_On_Working = "وب اپليکيشن در حال آماده سازي است";


	FollowergirPage_Page_Title = "برنامه فالوورگير اينستاگرام - IODynamic";
	FollowergirPage_AppName = "فالوورگير اينستاگرام";
	FollowergirPage_Introduction = "فالوورگير اينستاگرام اين امکان را مي‌دهد تعداد فالوور، لايک‌ و کامنت‌هاي اکانت خود را به صورت رايگان افزايش دهيد ، بنابراين اگر به دنبال رشد سريع فالوور، لايک‌، کامنت و بازديد‌کنندگان از پیج اينستاگرام خود هستيد، اين برنامه همان چيزي است که شما نياز داريد.";
	FollowergirPage_AboutApp_Header = "قابليت‌هاي برنامه";
	FollowergirPage_AboutApp_Title_1 = "ثبت رايگان سفارش";
	FollowergirPage_AboutApp_Message_1 = "با فالوو کردن کاربران و يا لايک از پست‌ها سکه رايگان کسب کرده و سفارش براي حساب مورد نظر خود ثبت کنيد";
	FollowergirPage_AboutApp_Title_2 = "سفارش براي اکانت دلخواه";
	FollowergirPage_AboutApp_Message_2 = "ثبت سفارش براي انواع مختلف سفارش و براي هر کاربر اينستاگرام امکان‌پذير است";
	FollowergirPage_AboutApp_Title_3 = "سفارش و دريافت سريع";
	FollowergirPage_AboutApp_Message_3 = "سفارشات با کيفيت و سرعت بالا انجام مي‌شود";
	FollowergirPage_AboutApp_Title_4 = "آمار و تجزيه و تحليل حساب";
	FollowergirPage_AboutApp_Message_4 = "نمودارهاي آماري اطلاعات دقيق را نمايش مي‌دهند و با اين توانايي مي‌توانيد تعداد فالوورهاي اينستاگرام و تعداد لايک پست‌هاي روزانه را در نمودارهاي آماري مشاهده کنيد";
	FollowergirPage_AboutApp_Title_5 = "امنيت";
	FollowergirPage_AboutApp_Message_5 = "ما حريم خصوصي شما را جدي مي‌گيريم و هرگز به اشخاص ثالث اجازه دسترسي به داده‌هاي کاربران را نخواهيم داد";
	FollowergirPage_HowWorks_Title = "نحوه کار";
	FollowergirPage_HowWorks_Message = "براي افزايش فالوور، کامنت‌ و لايک‌هاي حساب اينستاگرام خود، سکه رايگان در برنامه جمع آوري کرده و براي خود سفارش ‌ثبت کنید يا همچنین مي‌توانيد در برنامه سکه بخريد. در برنامه فالورگیر اينستاگرام علاوه بر انجام سفارشات، مي توانيد از امکاناتي مانند مديريت حساب، ثبت و کنسل سفارشات، جمع آوری سریع سکه و ثبت سفارش فالوور و لایک و کامنت برای کاربر و پست دلخواه، آمارگير و آناليز حساب و ... استفاده کنيد";
	FollowergirPage_Ability_Header = "امکانات";
	FollowergirPage_Ability_1_Title = "سريع";
	FollowergirPage_Ability_1_Message = "فالوورگير اينستاگرام سريعتر از هر برنامه ديگري کار مي‌کند";
	FollowergirPage_Ability_2_Title = "ورود با بي نهايت اکانت";
	FollowergirPage_Ability_2_Message = "به تعداد نامحدود مي‌توانيد با اکانت اينستاگرام لوگين کنيد";
	FollowergirPage_Ability_3_Title = "امن";
	FollowergirPage_Ability_3_Message = "اتصال برنامه کاملا ايمن است و از داده‌هاي کاربر محافظت مي‌کند";
	FollowergirPage_Ability_4_Title = "رابط کاربر پسند";
	FollowergirPage_Ability_4_Message = "رابط کاربري بسيار ساده است ، شما قبلاً مي دانيد که چگونه از آن استفاده کنيد";
	FollowergirPage_Ability_5_Title = " API دسترسي";
	FollowergirPage_Ability_5_Message = "امکان ثبت و پيگيري سفارشات از طريق لينک و اسکريپت‌هاي آماده براي فروشندگان سايت و نمايندگان";
	FollowergirPage_Ability_6_Title = "بهترين طراحي";
	FollowergirPage_Ability_6_Message = "برنامه از سريعترين و بروزترين کتابخانه‌هاي موجود استفاده مي‌کند";
	FollowergirPage_Download_Header = "دانلود";
	FollowergirPage_Download_Introduction = "شما مي‌توانيد جديدترين نسخه برنامه را مستقيماً از وب سايت دانلود کنيد يا آن را از کانال تلگرام ما دانلود کرده يا مي‌توانيد از فروشگاه‌هاي اپليکيشن دانلود بفرماييد";
	FollowergirPage_Download_Web = "وب اپلیکیشن";
	FollowergirPage_Download_Web_Login = "ورود به وب اپلیکیشن فالوورگیر اینستاگرام";
	FollowergirPage_Download_Android = "اندروید";
	FollowergirPage_Download_Download_Title_1 = "دانلود مستقیم آخرین نسخه";
	FollowergirPage_Download_Download_Message_1 = "دانلود برنامه فالوورگیر اینستاگرام";
	FollowergirPage_Download_Download_Title_2 = "دانلود از کانال تلگرام";
	FollowergirPage_Download_Download_Message_2 = "باز کردن کانال تلگرام";
	FollowergirPage_Download_Download_Title_3 = "دانلود از فروشگاه‌هاي اندرويدي";
	FollowergirPage_Download_Download_Message_3_1 = "دانلود از کافه‌بازار";
	FollowergirPage_Download_Download_Message_3_2 = "دانلود از مایکت";
	FollowergirPage_Tags = "تگ ها";
	FollowergirPage_Tags1 = "افزایش فالوور اینستاگرام - افزایش فالوور رایگان اینستاگرام - افزایش رایگان لایک اینستاگرام - افزایش لایک اینستاگرام - افزایش کامنت اینستاگرام - افزایش رایگان کامنت اینستاگرام - افزایش فالور اینستاگرام - افزایش رایگان فالور اینستاگرام - افزایش فالوئر اینستاگرام - افزایش رایگان فالوئر اینستاگرام";
	FollowergirPage_Tags2 = "خرید فالوور اینستاگرام - خرید فالور اینستاگرام - خرید فالوئر اینستاگرام - خرید ارزان فالوور اینستاگرام - خرید ارزان فالور اینستاگرام - خرید ارزان فالوئر اینستاگرام - خرید لایک اینستاگرام - خرید ارزان لایک اینستاگرام - خرید کامنت اینستاگرام- خرید ارزان کامنت اینستاگرام";
	FollowergirPage_Tags3 = "فالوورگیر اینستاگرام - فالوور گیر اینستاگرام - فالوورگیر ایسنتاگرام - دانلود فالوورگیر اینستاگرام - دانلود فالورگیر اینستاگرام - دانلود فالوئرگیر اینستاگرام - دانلود فالوور گیر اینستاگرام رایگان - دانلود رایگان فالورگیر اینستاگرام - دانلود رایگان فالوورگیر اینستاگرام - افزایش دهنده فالوور اینستاگرام - افزایش دهنده لایک اینستاگرام رایگان - افزایش فالوور رایگان - افزایش لایک رایگان - افزایش کامنت اینستاگرام رایگان";
	FollowergirPage_Tags4 = "چطور فالوورهام رو افزایش بدم؟ - آموزش افزایش فالوور اینستاگرام رایگان - اموزش افزایش فالور رایگان - آموزش افزایش فالوئر رایگان - آموزش افزایش رایگان فالوور اینستاگرام - افزایش سریع فالور ایسنتاگرام رایگان - آموزش افزایش دادن پیج اینستاگرام - چطور فالوورهای پیج اینستاگرام رو افزایش بدیم - آموزش زیاد کردن فالورهای پیج اینستاگرامی - سریعترین راه افزایش فالوور رایگان اینستاگرام - سریعتری روش افزایش فالوور اینستاگرام - چگونه فالوورهای پیج اینستاگرام را افزایش بدیم";
	FollowergirPage_Tags5 = "افزایش 1کا فالوور اینستاگرام - افزایش روزانه 1 کا فالوور اینستاگرام - افزایش رایگان 1 کا فالوور اینستارگام - رساندن پیج اینستاگرام به صد کا رایگان";
	FollowergirPage_Tags6 = "افزایش فالوور - افزایش فالوور اینستاگرام رایگان - افزایش رایگان فالوور - افزایش رایگان فالوور فیک اینستاگرام - افزایش فالوور فیک اینستاگرام - خرید فالوور فیک اینستاگرام - افزایش فالوور واقعی اینستاگرام - خرید فالوور واقعی اینستاگرام - چطور فالورهای واقعی اینستاگرام رو افزایش بدم - آموزش افزایش فالوور واقعی اینستاگرام";


	MembergirPage_Page_Title = "برنامه عضوگير تلگرام - IODynamic";
	MembergirPage_AppName = "عضوگير تلگرام";
	MembergirPage_Introduction = "ممبر تلگرام به شما امکان را مي‌دهد تعداد ممبر و بازديدهاي کانال يا گروه‌ تلگرامي خود را به صورت رايگان افزايش دهيد، بنابراين اگر به دنبال رشد سريع عضوها و افزايش بازديدکنندگان کانال تلگرام خود هستيد، اين برنامه همان چيزي است که شما نياز داريد";
	MembergirPage_AboutApp_Header = "قابليت‌هاي برنامه";
	MembergirPage_AboutApp_Title_1 = "ثبت رايگان سفارش";
	MembergirPage_AboutApp_Message_1 = "با عضو شدن در کانال‌ و گروه‌ها و با لايک از پست‌ها الماس و سکه رايگان کسب کرده و براي کانال يا گروه مورد نظر خود سفارش ثبت کنيد";
	MembergirPage_AboutApp_Title_2 = "سفارش براي کانال و گروه دلخواه";
	MembergirPage_AboutApp_Message_2 = "ثبت سفارش براي انواع مختلف سفارش و براي هر کانال و گروه امکان‌پذير است";
	MembergirPage_AboutApp_Title_3 = "سفارش و دريافت سريع";
	MembergirPage_AboutApp_Message_3 = "سفارشات با کيفيت و سرعت بالا انجام مي شود";
	MembergirPage_AboutApp_Title_4 = "آمار و تجزيه و تحليل حساب";
	MembergirPage_AboutApp_Message_4 = "نمودارهاي آماري اطلاعات دقيق را نمايش مي‌دهند و با اين توانايي مي‌توانيد تعداد ممبرهاي تلگرام و تعداد لايک پست‌هاي روزانه را در نمودارهاي آماري مشاهده کنيد";
	MembergirPage_AboutApp_Title_5 = "امنيت";
	MembergirPage_AboutApp_Message_5 = "ما حريم خصوصي شما را جدي مي‌گيريم و هرگز به اشخاص ثالث اجازه دسترسي به داده‌هاي شما را نخواهيم داد";
	MembergirPage_HowWorks_Title = "نحوه کار";
	MembergirPage_HowWorks_Message = "براي افزايش ممبر و بازديد‌ کانال و گروه تلگرام خود، مي‌توانيد سکه رايگان در برنامه جمع آوري کرده و براي خود سفارش ثبت کنيد يا مي‌توانيد در برنامه سکه بخريد. در برنامه عضوگير تلگرام علاوه بر سفارش، مي‌توانيد از امکاناتي مانند تبديل الماس و سکه به يکديگر ، مديريت حساب ، آمارگير و آناليز حساب و ... استفاده کنيد";
	MembergirPage_Ability_Header = "امکانات";
	MembergirPage_Ability_1_Title = "سريع";
	MembergirPage_Ability_1_Message = "عضوگير تلگرام سريعتر از هر برنامه ديگري کار مي‌کند";
	MembergirPage_Ability_2_Title = "ورود با بي نهايت اکانت";
	MembergirPage_Ability_2_Message = "به تعداد نامحدود مي‌توانيد با اکانت تلگرام لوگين کنيد";
	MembergirPage_Ability_3_Title = "امن";
	MembergirPage_Ability_3_Message = "اتصال برنامه کاملا ايمن است و از داده‌هاي کاربر محافظت مي‌کند";
	MembergirPage_Ability_4_Title = "رابط کاربر پسند";
	MembergirPage_Ability_4_Message = "رابط کاربري بسيار ساده است ، شما قبلاً مي دانيد که چگونه از آن استفاده کنيد";
	MembergirPage_Ability_5_Title = "API دسترسي";
	MembergirPage_Ability_5_Message = "فالوورگير اينستاگرام";
	MembergirPage_Ability_6_Title = "بهترين طراحي";
	MembergirPage_Ability_6_Message = "برنامه از بروزترين کتابخانه‌هاي موجود استفاده مي‌کند";
	MembergirPage_Download_Header = "دانلود";
	MembergirPage_Download_Introduction = "شما مي‌توانيد جديدترين نسخه برنامه را مستقيماً از وب سايت دانلود کنيد يا آن را از کانال تلگرام ما دانلود کنيد يا مي‌توانيد از فروشگاه‌هاي اپليکيشن بارگيري کنيد";
	MembergirPage_Download_Web = "وب اپلیکیشن";
	MembergirPage_Download_Web_Login = "ورود به وب اپلیکیشن عضوگیر تلگرام";
	MembergirPage_Download_Android = "اندروید";
	MembergirPage_Download_Download_Title_1 = "دانلود مستقیم آخرین نسخه";
	MembergirPage_Download_Download_Message_1 = "دانلود برنامه عضوگیر تلگرام";
	MembergirPage_Download_Download_Title_2 = "دانلود از کانال تلگرام";
	MembergirPage_Download_Download_Message_2 = "باز کردن کانال تلگرام";
	MembergirPage_Download_Download_Title_3 = "دانلود از فروشگاه‌هاي اندرويدي";
	MembergirPage_Download_Download_Message_3_1 = "مشاهده در کافه‌بازار";
	MembergirPage_Download_Download_Message_3_2 = "مشاهده در مايکت";
	MembergirPage_Tags = "تگ ها";
	MembergirPage_Tags1 = "افزایش ممبر تلگرام - افزایش ممبر رایگان تلگرام - افزایش رایگان لایک تلگرام - افزایش لایک تلگرام - افزایش نظر تلگرام - افزایش رایگان نظر تلگرام - افزایش عضو تلگرام - افزایش رایگان عضو تلگرام - افزایش ممبر تلگرام - افزایش رایگان ممبر تلگرام";
	MembergirPage_Tags2 = "خرید ممبر تلگرام - خرید عضو تلگرام - خرید ممبر تلگرام - خرید ارزان ممبر تلگرام - خرید ارزان عضو تلگرام - خرید ارزان ممبر تلگرام - خرید لایک تلگرام - خرید ارزان لایک تلگرام - خرید نظر تلگرام- خرید ارزان نظر تلگرام";
	MembergirPage_Tags3 = "ممبرگیر تلگرام - ممبر گیر تلگرام - ممبرگیر ایسنتاگرام - دانلود ممبرگیر تلگرام - دانلود عضوگیر تلگرام - دانلود ممبرگیر تلگرام - دانلود ممبر گیر تلگرام رایگان - دانلود رایگان عضوگیر تلگرام - دانلود رایگان ممبرگیر تلگرام - افزایش دهنده ممبر تلگرام - افزایش دهنده لایک تلگرام رایگان - افزایش ممبر رایگان - افزایش لایک رایگان - افزایش نظر تلگرام رایگان";
	MembergirPage_Tags4 = "چطور ممبرهام رو افزایش بدم؟ - آموزش افزایش ممبر تلگرام رایگان - اموزش افزایش عضو رایگان - آموزش افزایش ممبر رایگان - آموزش افزایش رایگان ممبر تلگرام - افزایش سریع عضو ایسنتاگرام رایگان - آموزش افزایش دادن پیج تلگرام - چطور ممبرهای پیج تلگرام رو افزایش بدیم - آموزش زیاد کردن عضوهای پیج تلگرامی - سریعترین راه افزایش ممبر رایگان تلگرام - سریعتری روش افزایش ممبر تلگرام - چگونه ممبرهای پیج تلگرام را افزایش بدیم";
	MembergirPage_Tags5 = "افزایش 1کا ممبر تلگرام - افزایش روزانه 1 کا ممبر تلگرام - افزایش رایگان 1 کا ممبر اینستارگام - رساندن پیج تلگرام به صد کا رایگان";
	MembergirPage_Tags6 = "افزایش ممبر - افزایش ممبر تلگرام رایگان - افزایش رایگان ممبر - افزایش رایگان ممبر فیک تلگرام - افزایش ممبر فیک تلگرام - خرید ممبر فیک تلگرام - افزایش ممبر واقعی تلگرام - خرید ممبر واقعی تلگرام - چطور عضوهای واقعی تلگرام رو افزایش بدم - آموزش افزایش ممبر واقعی تلگرام";




	Dubsman_Page_Title = "دابسمن(دابسمش من) - IODynamic";
	Dubsman_AppName = "دابسمن (دابسمش من)";
	Dubsman_Introduction = "دابسمن یک برنامه اندرویدی است که از طریق آن می‌توانید فیلم‌های خنده دار(دابسمش) بسازید، با صداگذاری خود روی کلیپ و فیلم‌ها،آن‌ها را دوبله کنید، ویدیو‌های آنلاین تماشا کنید و در کنار دوستان و خانواده زمان خوبی را سپری کنید";
	Dubsman_AboutApp_Header = "قابلیت‌های برنامه";
	Dubsman_AboutApp_Title_1 = "ساخت دابمسش و دوبله";
	Dubsman_AboutApp_Message_1 = "دابسمش بسازید، با صدای خواننده مورد علاقه خود ویدیو بسازید، فیلم‌ها را دوبله کنید و صدای خود را در فیلم‌ها ظبط کنید";
	Dubsman_AboutApp_Title_2 = "امکان میکس یا ترکیب فیلم‌ها";
	Dubsman_AboutApp_Message_2 = "قطعات فیلم‌های خود را قسمت به قسمت ضبط کرده و بهم بچسبانید";
	Dubsman_AboutApp_Title_3 = "خوانندگی";
	Dubsman_AboutApp_Message_3 = "با آهنگ خواننده مورد علاقه خود لب خوانی کنید";
	Dubsman_AboutApp_Title_4 = "ویدیو‌های آنلاین";
	Dubsman_AboutApp_Message_4 = "امکان تماشای دوبله آنلاین کاربران و بارگذاری فیلم خود برای تماشا دیگر کاربران";
	Dubsman_AboutApp_Title_5 = "مجموعه بهترین آهنگ ها";
	Dubsman_AboutApp_Message_5 = "مجموعه ای از آهنگ ها ، جملات خنده دار، کلیپ‌های فیلم، مصاحبه‌های خنده دار ، گزارش‌های خنده دار فوتبال و غیره";
	Dubsman_HowWorks_Title = "نحوه کار";
	Dubsman_HowWorks_Message = "صدای فیلم‌های قدیمی و جدید، موسیقی‌های به یاد ماندنی که تنها با گوش دادن به آنها خاطرات خوبی به یاد خواهید آورد و از آن‌ها لذت مخواهید برد، می‌توانید روی یک فیلم صدا‌گذاری کنید، آن را برای خودتان نگه دارید یا در سرور برنامه به اشتراک بگذارید و یا آن را در شبکه‌های اجتماعی با دوستان خود به اشتراک بگذارید. برنامه قابلیت‌های زیادی از جمله، ساخت دابسمش، تماشای ویدیوهای آنلاین، میکس ویدیو و ... است ";
	Dubsman_Ability_Header = "امکانات";
	Dubsman_Ability_1_Title = "خوانندگی";
	Dubsman_Ability_1_Message = "با خواننده مورد علاقه خود لب‌خوانی کنید";
	Dubsman_Ability_2_Title = "دابسمش";
	Dubsman_Ability_2_Message = "ساخت ویدیو‌های بامزه با روش‌های مختلف";
	Dubsman_Ability_3_Title = "تماشای ویدی‌های آنلاین";
	Dubsman_Ability_3_Message = "دابسمش‌های کاربران را آنلاین تماشا کنید و به آن‌ها امتیاز دهید";
	Dubsman_Ability_4_Title = "رابط کاربر پسند";
	Dubsman_Ability_4_Message = "رابط کاربری بسیار ساده است ، شما قبلاً می دانید که چگونه از آن استفاده کنید";
	Dubsman_Ability_5_Title = "میکس ویدیوها";
	Dubsman_Ability_5_Message = "میکس ویدیوها و دوبله و انواع قابلیت‌ها";
	Dubsman_Ability_6_Title = "بهترین طراحی";
	Dubsman_Ability_6_Message = "برنامه از بروزترین کدها و کتابخانه‌های موجود استفاده می‌کند";
	Dubsman_Download_Header = "دانلود";
	Dubsman_Download_Introduction = "شما می‌توانید جدیدترین نسخه را مستقیماً از وب سایت یا از کانال تلگرام یا می‌توانید از فروشگاه‌های اپلیکیشن ایرانی دانلود کنید.";
	Dubsman_Download_Download_Title_1 = "دانلود مستقیم";
	Dubsman_Download_Download_Message_1 = "دانلود آخرین نسخه";
	Dubsman_Download_Download_Title_2 = "دانلود از کانال تلگرام";
	Dubsman_Download_Download_Message_2 = "باز کردن کانال تلگرام";
	Dubsman_Download_Download_Title_3 = "دانلود از فروشگاه‌های اندرویدی";
	Dubsman_Download_Download_Message_3_1 = "مشاهده در کافه‌بازار";
	Dubsman_Download_Download_Message_3_2 = "مشاهده در مایکت";

	MobileBank_Page_Title = "همراه بانک - IODynamic";
	MobileBank_AppName = "همراه بانک";
	MobileBank_Introduction = "برنامه همراه بانک به شما کمک می کند کارت‌های بانکی خود را مدیریت کرده و از طریق تلفن عملیات‌های بانکی را انجام دهید و دیگر نیازی به حمل کارت‌های بلااستفاده ندارید. ذخیره تمام اطلاعات کارت و همچنین پرداخت قبض‌ها، خرید شارژ، مدیریت پیامک‌های بانکی و نوشتن یادداشت برای هر پیامک و امنیت بالا تنها گوشه‌ایی از قابلیت‌های برنامه است";
	MobileBank_AboutApp_Header = "قابلیت‌های برنامه";
	MobileBank_AboutApp_Title_1 = "انجام عملیات‌های بانکی";
	MobileBank_AboutApp_Message_1 = "انتقال پول و بررسی باقیمانده حساب با اتصال به درگاه‌های بانکی اینترنتی با پروتکل امن و غیر مستقیم انجام می شود که بستری امن است (انجام عملیات بانکی با دریافت نام کاربری و پسورد از بانک امکان پذیر است)";
	MobileBank_AboutApp_Title_2 = "حفاظت از اطلاعات کاربر";
	MobileBank_AboutApp_Message_2 = "برنامه از حسگر اثر انگشت، سوال امنیتی، پین و الگو برای احراز هویت کاربر استفاده می‌کند و در هنگان وارد کردن اطلاعات اشتباه از دوربین جلو سلفی گرفته می‌شود";
	MobileBank_AboutApp_Title_3 = "مدیریت پیامک‌های بانکی";
	MobileBank_AboutApp_Message_3 = "در صفحه پیام‌ها می‌توانید پیامک‌های گردش حساب خود را با توجه به هر کارت دسته‌بندی کنید. همچنین شما می توانید اطلاعات کارت و معاملات را به اشتراک بگذارید ، با انتخاب گزینه ای شماره کارت خود را برای دیگران ارسال کنید و پیام‌ها را مدیریت کنید";
	MobileBank_AboutApp_Title_4 = "پرداخت با بارکد خوان";
	MobileBank_AboutApp_Message_4 = "امکان پرداخت قبوض با بارکد خوان ، پرداخت آسان قبض ها (آب ، برق ، گاز و تلفن)";
	MobileBank_AboutApp_Title_5 = "خرید شارژ";
	MobileBank_AboutApp_Message_5 = "بدون نیاز به کارت می‌توانید کارت شارژ ایرانسل ، همراه اول و رایتل خریداری کنید";
	MobileBank_AboutApp_Title_6 = "دریافت مانده حساب بانکی";
	MobileBank_AboutApp_Message_6 = "مانده حساب بانکی را با صفحه وب سایت بانک دریافت کنید";
	MobileBank_AboutApp_Title_7 = "امنیت";
	MobileBank_AboutApp_Message_7 = "ما حریم خصوصی شما را جدی می گیریم و هرگز به اشخاص ثالث اجازه دسترسی به داده های شما را نمی دهیم";
	MobileBank_HowWorks_Title = "نحوه کار";
	MobileBank_HowWorks_Message = "در این برنامه ، علاوه بر این که می‌توانید تمام جزئیات کارت‌های بانک را وارد کنید ، شما توانایی انتقال پول، دریافت مانده، خرید شارژ، پرداخت قبض، مدیریت پیامک‌های بانکی، کپی کردن شماره کارت ، ارسال جزئیات و تصویر کارت را دارید، همچنین اطلاعات بانک در اختیار شماست تا با بانک تماس بگیرید و از یو اس اس دی بانک استفاده کنید و مهمتر از همه، می‌توانید پیامک‌های بانکی خود را جداگانه و با تاریخ مشاهده کنید و برای هر یک یادداشت بنویسید";
	MobileBank_Ability_Header = "امکانات";
	MobileBank_Ability_1_Title = "احراز هویت";
	MobileBank_Ability_1_Message = "استفاده از حسگر اثر انگشت، پسورد، پین و الگو ورودی";
	MobileBank_Ability_2_Title = "کارت‌ها همراه شماست، هر کجا";
	MobileBank_Ability_2_Message = "هر کاری را که لازم دارید با کارت خود می‌توانید انجام دهید";
	MobileBank_Ability_3_Title = "امن";
	MobileBank_Ability_3_Message = "اتصال همراه بانک کاملاً ایمن است و از داده‌های کاربران محافظت می‌کند";
	MobileBank_Ability_4_Title = "رابط کاربر پسند";
	MobileBank_Ability_4_Message = "رابط کاربری بسیار ساده است، به صورتی که شما از قبل می‌دانید که چگونه از آن استفاده کنید";
	MobileBank_Ability_5_Title = "حالت محافظت";
	MobileBank_Ability_5_Message = "داده های کاربر رمزگذاری شده است و امنیت بالایی مانند گرفتن عکس سلفی هنگام ورود رمز ورود اشتباه توسط کاربر وجود دارد";
	MobileBank_Ability_6_Title = "بهترین طراحی";
	MobileBank_Ability_6_Message = "بانک موبایل از جدیدترین و بهترین کدها، روش ها و کتابخانه‌ها استفاده می‌کند";
	MobileBank_Download_Header = "دانلود";
	MobileBank_Download_Introduction = "موبال بانک رایگان نیست و می توانید برنامه را با پرداخت از فروشگاه های برنامه بارگیری کنید.";
	MobileBank_Download_Download_Title_1 = "دانلود از فروشگاه‌های اپلیکیشن ایرانی";
	MobileBank_Download_Download_Message_1_1 = "دانلود از کافه بازار";
	MobileBank_Download_Download_Message_1_2 = "دانلود از مایکت";


	Shop_Page_Title = "فروشگاه";
	Shop_Date = "تاريخ";
	Shop_Save = "ذخيره";
	Shop_Header = "فروشگاه";
	Shop_Warning1 = "در صورت وجود مشکل در خريد يا هر گونه سوال با پشتيباني در ارتباط باشيد.";
	Shop_Package = "بسته";
	Shop_Package_Free = "بسته رايگان";
	Shop_Diamond = "الماس";
	Shop_Coin = "سکه";
	Shop_Price = "قيمت";
	Shop_Value = "تومان";
	Shop_OneKFollower = "هر کا فالوور";
	Shop_OneKLike = "هر کا لايک";
	Shop_OneKComment = "هر کا کامنت";
	Shop_OneKMember = "هر کا ممبر";
	Shop_OneKView = "هر کا بازديد";
	Shop_Buy = "خريد";
	Shop_PopUp_Description = "با ساخت حساب کاربري يا ورود به حساب کاربري خود، بسته مورد نظر را خريد کرده و سفارش خود را ثبت و مديريت کنيد!";
	Shop_PopUp_Login_Button = "ورود با حساب کاربري";
	Shop_Package_Free_Name = "بسته رايگان";
	Shop_Package_Free_Credit = "نامحدود";
	Shop_Package_Free_Price = "رايگان";
	Shop_Package_Free_Explain_Title = "توضيحات";
	Shop_Package_Free_Explain_Msg = "با ورود به پنل کاربري ميتوانيد با فالوو و لايک کردن سفارشات سکه جمع کنيد و به رايگان سفارش ثبت کنيد";
	Shop_Package_Free_Button = "ورود";





	ContactUs_Page_Title = "ارتباط با ما - IODynamic";
	ContactUs_Title = "ارتباط با ما";
	ContactUs_Ticket_Title = "تماس با ما";
	ContactUs_Ticket_Name = "نام";
	ContactUs_Ticket_Email = "ايميل";
	ContactUs_Ticket_Captcha = "کد امنيتي";
	ContactUs_Ticket_Subject = "موضوع";
	ContactUs_Ticket_Message = "پيام";
	ContactUs_Ticket_Send = "ارسال";
	ContactUs_AboutUs_Title = "درباره ما";
	ContactUs_AboutUs_Email = "آدرس ايميل";
	ContactUs_AboutUs_Telegram = "آدرس کانال تلگرام";
	ContactUs_AboutUs_Telegram_Link = "iodynamic@";
	ContactUs_AboutUs_Privacy_Policy = "قوانين و سياستنامه‌ها";
	ContactUs_AboutUs_Privacy_Policy_Message = "مطالعه سياست‌نامه حريم خصوصي";
	ContactUs_Hint_Name_Empty = "نام را وارد کنيد!";
	ContactUs_Hint_Email_Empty = "ايميل را وارد کنيد!";
	ContactUs_Hint_Email_Invalid = "فرمت ايميل وارد شده اشتباه است!";
	ContactUs_Hint_Subject_Empty = "موضوع را وارد کنيد!";
	ContactUs_Hint_Message_Empty = "پيام را وارد کنيد!";
	ContactUs_Hint_Message_Is_Short = "متن پيام خيلي کوتاه است!";
	ContactUs_Hint_Captcha_Empty = "کد امنيتي را وارد کنيد!";
	ContactUs_Hint_Captcha_Wrong = "کد امنيتي وارد شده اشتباه است!";

	ContactUs_AboutUs_Phone = "شماره تماس";
	ContactUs_AboutUs_Phone_Number = "09024449741";
	ContactUs_AboutUs_Address = "آدرس";
	ContactUs_AboutUs_Address_Text = "تهران - شهریار - شهر جدید اندیشه - فاز 5 - میدان جهاد - کوچه اقتدار - پلاک 18 - واحد 2";




	Toast_Title_Ticket = "تيکت با موفقيت ارسال شد!";
	Toast_Content_Ticket = "پشتيباني از طريق ايميل با شما در ارتباط خواهد بود";
	Toast_Title_Ticket_NotSend = "!تيکت ارسال نشد";
	Toast_Content_Ticket_NotSend = "مشکلي در ارسال تيکت به وجود آمده است";
	Toast_Content_Ticket_NotSend_Captcha_Invalid = "کد امنيتي وارد شده اشتباه است";
	Toast_Content_Ticket_NotSend_Captcha_Expire = "کد امنيتي منقضي شده است، لطفا کد جديد را وارد کنيد!";
	Toast_Ticket_Too_Many_Attemp = "تعداد ایمیل‌های ارسالی زیاد بوده است، لطفا قبل از تلاس مجدد مدتی صبر کنید!";


	Api_Page_Title = "دسترسی API - IODynamic";
	Api_Title = "دسترسی API";
	Api_Request_Type = "نوع درخواست";
	Api_Url_Structure = "ساختار URL";
	Api_Parameters = "پارامترهای ورودی";
	Api_Parameters_Received = "پارامترهای دریافتی";
	Api_App_Name_Description = "نام برنامه‌ایی که میخواهید برای آن سفارش ثبت کنید. مقدار followergir برای برنامه فالوورگیر اینستاگرام";
	Api_Session_Description = "نشست(Session) که از وب اپلیکیشن دریافت کرده‌اید";
	Api_Username_Description = "نام کاربری که می‌خواهید برای آن سفارش ثبت کنید";
	Api_PostId_Description = "آیدی عددی یا لینک پست";
	Api_UserId_Description = "یوزرآیدی عددی کاربری که می‌خواهید برای آن سفارش ثبت کنید";
	Api_Count_Description = "تعداد سفارش";
	Api_Coin_Description = "مقدار coin میزان سکه باقیمانده در حساب کاربری است";
	Api_Order_Count_Description = "order_count میزان کل سفارش ثبت شده و فعال است";


	Api_Introduce_Text1 = "API مخفف عبارت Application Programming Interface می‌باشد که به برنامه نویسان امکان رد و بدل کردن اطلاعات بین پلتفرم‌های مختلف را از طریق ارسال یک درخواست HTTP(S) ساده و دریافت پاسخ استفاده کرد.";
	Api_Introduce_Text2 = "اطلاعات آورده شده به صورت REST  است، در واقع REST یک روش ساده و انعطاف پذیری برای استفاده از API است و البته محبوب ترین و پر کاربرد ترین که می‌توان توسط این ساختار از هر کلاینت و پلتفرمی ‌درخواست ساده HTTP(S) را ارسال و پاسخ آن را دریافت نمود.";
	Api_Introduce_Text3 = "دقت بفرمایید پاسخ بازگشتی از سمت سرور به صورت JSON است، اگر با JSON آشنایی ندارید می‌توانید با مراجعه به سایت https://json.org هم از ساختار فرمت آن مطلع شوید و هم پکیج مربوط به زبان برنامه نویسی مورد نظر خود را دریافت نمایید.";

	Api_Introduce_Text4 = "آدرس هاست برای ارسال درخواست:";
	Api_Introduce_Text_Link = "https://api.iodynamic.com";
	Api_Introduce_Text_SSL = "فراخوانی متد ها از طریق لایه SSL امکان پذیر است.";
	Api_Introduce_Text_Session = "در صورتی که نشست(Session) برای ارسال درخواست ندارید، وارد وب اپلیکیشن شده و از بخش API نشست را دریافت کنید.";

	Api_Introduce_Response_Title = "ساختار پاسخ";
	Api_Introduce_Response_Text = "در پاسخ بازگشتی پارامتر status نشان‌دهنده موفقیت آمیز بودن درخواست یا وجود خطایی در درخواست است، در صورت وجود خطا پارامتر description نیز در پاسخ وجود خواهد داشت.";
	Api_Introduce_Response_Table_Status = "مقدار ok در صورت موفقیت آمیز بودن و مقدار error در صورت وجود خطا در درخواست";
	Api_Introduce_Response_Table_Description = "متن خطای بازگشتی در صورتی که درخواست با خطا مواجه شود";
	Api_Introduce_Response_Description = "خطاهای احتمالی پارامتر توضیحات";
	Api_Introduce_Response_Error_CREDIT_LIMIT = "تعداد سکه حساب کاربری کمتر از میزان مورد نیاز است";
	Api_Introduce_Response_Error_INVALID_PARAMETERS = "پارامترها ناقص هستند";
	Api_Introduce_Response_Error_METHOD_NOT_FOUND = "متدی با این نام پیدا نشده است";
	Api_Introduce_Response_Error_INVALID_REQUEST_METHOD = "متد فراخوانی Get یا Post اشتباه است";
	Api_Introduce_Response_Error_ORDER_NOT_FOUND = "سفارش وجود ندارد یا به اتمام رسیده است";
	Api_Introduce_Response_Error_TOO_MANY_REQUEST = "تعداد درخواست‌های ارسالی زیاد بوده است";
	Api_Introduce_Response_Error_USER_BLOCK = "کاربر بلاک شده است";
	Api_Introduce_Response_Error_UNAUTHORIZED = "نشست نامعتبر است";

	Api_Introduce_Error_Abuse = "در صورتی که تعداد درخواست‌های شامل خطا، اشتباه و نامعتبر زیاد باشد یا در صورت سوءاستفاده، حساب کاربری به صورت همیشه مسدود خواهد شد. ";


	Api_Get_Credit_Title = "دریافت اعتبار حساب کاربری";
	Api_Get_Credit_Text = "از این تابع برای دریافت اعتبار حساب کاربری استفاده می‌شود.";
	Api_Get_Order_Title = "دریافت وضعیت سفارش";
	Api_Get_Order_Text = "از این تابع برای دریافت آخرین وضعیت سفارش استفاده می‌شود.";
	Api_Get_Order_Username_Description = "نام کاربری که برای آن سفارش ثبت شده است";
	Api_Parameters_Order_Count_Description = "تعداد سفارش ثبت شده";
	Api_Parameters_Remaining_Description = "تعداد باقیمانده سفارش";

	Api_Order_Member_Title = "سفارش فالوور/ممبر";
	Api_Order_Member_Text = "از این تابع برای سفارش فالوور یا ممبر استفاده می‌شود";
	Api_Order_Like_Title = "سفارش لایک";
	Api_Order_Like_Text = "از این تابع برای سفارش لایک استفاده می‌شود";
	Api_Order_Comment_Title = "سفارش کامنت";
	Api_Order_Comment_Text = "از این تابع برای سفارش کامنت یا نظر استفاده می‌شود";
	Api_Order_Comment_List_Description = "تایپ لیست جیسون آرایه(JSON Array) بوده که آیتم‌های آن متن کامنت‌ها بوده و از جنس رشته(string) هستند.";
	Api_Order_Comment_List_Description_Example_Title = "مثال برای لیست کامنت‌ها";

	Api_Parameters_Error_Description = "خطایی که به دلیل آن سفارش متوقف شده است";
	Api_Parameters_Error_Description_Title = "خطاهای احتمالی سفارش";
	Api_Parameters_Error_Description_Text = "در صورت توقف سفارش، یکی از موارد زیر در متن خطا وجود خواهد داشت:";
	Api_Parameters_Error_USER_PRIVATE_Description = "اکانت کاربر در حالت پرایوت قرار دارد";
	Api_Parameters_Error_USER_NOT_FOUND_Description = "اکانت کاربر پیدا نشد";
	Api_Parameters_Error_MEDIA_NOT_FOUND_Description = "پست وجود ندارد";
	Api_Parameters_Error_COMMENTS_DISABLED_Description = "قابلیت کامنت گذاشتن برای پست غیرفعال است";
	Api_Parameters_Error_COMMENTS_DISABLED_FOR_VIEWER_Description = "قابلیت کامنت گذاشتن برای پست برای تعداد زیادی از کاربران غیرفعال است";
	Api_Parameters_Error_REPORT_Description = "این سفارش توسط کاربران گزارش محتوای نامناسب شده است";


	Api_Cancel_Order_Title = "کنسل سفارش";
	Api_Cancel_Order_Text = "از این تابع برای کنسل سفارش استفاده می‌شود";
	Api_Cancel_Type_Description = "تایپ سفارش، مقدار 1 برای سفارش فالوور/ممبر، مقدار 2 برای سفارش لایک و مقدار 3 برای سفارش کامنت";

	Api_Username_Optional = "در صورتی که سفارش فالوور/ممبر است، فیلد یوزرنیم باید ارسال شود";
	Api_PostId_Optional = "در صورتی که سفارش مربوط به پست است، سفارش لایک یا کامنت یا بازدید، لینک پست یا آیدی عددی پست باید ارسال شود.";



	Setting_Page_Title = "تنظیمات - IODynamic";
	Setting_Title = "تنظیمات";
	Setting_Theme_Title = "پوسته";
	Setting_Theme_Default = "ساده";
	Setting_Theme_Dark = "تاریک";
	Setting_Theme_Cosmic = "کیهانی";
	Setting_Language_Title = "زبان";
	Setting_Language_En = "English";
	Setting_Language_Fa = "فارسی";
	Setting_Cli_Title = "رابط خط فرمان";
	Setting_Cli_Activity_In_Pages = "نمایش خط فرمان در صفحات";
	Setting_Audio_Title = "صدا";
	Setting_Audio_Activity = "فعال بودن صدا";
	Setting_Audio_Volume = "میزان صدا";

	NotFound_Page_Title = "صفحه ناموجود - IODynamic";


	Select_Choose_From_List = "يک مورد را انتخاب کنيد";
	Select_No_Item = "موردي براي نمايش وجود ندارد!";



	Privacy_Policy_Page_Title: "سیاست نامه حریم خصوصی - IODynamic";

	Privacy_Header = "سیاست نامه حریم خصوصی";
	Privacy_Base = "متن حاضر دربرگیرنده‌ی معرفی ما، شرایط و قوانین استفاده از امکانات برنامه‌ها و وبسایت، و اطلاعاتی است که برای استفاده از محتوا، ابزارها و سرویس‌های ارائه شده توسط برنامه‌ها یا سایت ذخیره و استفاده می‌شود. ‌";
	Privacy_Base1 = " آیوُ داینامک (IODynamic) به حریم خصوصی کاربران خود احترام می‌گذارد و متعهد به حفاظت از اطلاعات شخصی است که شما در اختیار آن می‌گذارید. از آنجا که جمع‌آوری و پردازش اطلاعات شخصی بخش غیرقابل اجتنابی در ارائه خدمات ما به شما است، لذا به منظور آگاهی کامل از سیاست و عملکرد ما در این زمینه، مطالعه این سند تحت عنوان «سیاست نامه حریم خصوصی» و هر گونه اطلاعیه‌ایی که در مورد اصلاح و تغییرات جدید که در خصوص جمع‌آوری و پردازش اطلاعات توسط ما به حساب کاربری در سایت یا برنامه‌ها ارسال می‌شود، ضروری است.‌";

	Privacy_AboutUs_Title = "درباره ما";
	Privacy_AboutUs_Msg = "گروه آیوُ داینامیک از سال 1393 و با نام اولیه میکرو ک اس تشکیل شد، ساخت اپلیکیشن‌های اندروید سرگرمی و کاربردی اهداف اولیه گروه بود و هم اکنون وب اپلیکیشن و اپلیکیشن‌ها را با توجه به سرعت، کیفیت و نیاز کاربران برای پلتفرم‌های مختلف ارائه می‌کند. ";

	Privacy_DocChange_Title = "تغییرات این سند";
	Privacy_DocChange_Msg = "این سند مطابق با آخرین تغییرات قوانین و مقررات موضوعه کشور تدوین شده و مبیّن کلیه حقوق شما بر اساس قانون تجارت الکترونیکی مصوب ۱۳۸۲ و اسناد بین‌المللی ذی ربط است. این سند ممکن است دستخوش تغییرات و تجدیدنظر شود. لذا توصیه می‌شود که به منظور اطلاع از تغییرات این سند، نوتیفیکیشن‌ یا پیام‌های ارسالی به پنل سایت یا برنامه‌ها و مطالب کانال را دنبال بفرمایید.";
	Privacy_DocChange_Msg1 = "در صورتی که هر بخش از سیاست نامه حفظ حریم خصوصی رو متوجه نشدید، برای راهنمایی بیشتر با ایمیل support@iodynamic.com در ارتباط باشید.";

	Privacy_Main_Title = "اطلاعات حساب کاربری";
	Privacy_Main_Msg = "این اطلاعات شامل مواردی است که مخصوص هر کاربر بوده و به کمک آن می‌توان کاربر را به صورت منحصربه‌فرد شناسایی نمود. برای نمونه می‌توان به نام و نام خانوادگی، ایمیل یا  شماره تلفن آدرس آی‌پی، مدل گوشی، نسخه سیستم عامل و سایر اطلاعاتی که به صورت عادی در دسترس عموم مردم نیست، اشاره نمود. برای استفاده از پنل کاربری وب‌سایت یا برنامه‌ها از کاربر خواسته می‌شود تا برخی اطلاعات را وارد کند.";

	Privacy_Secure_Title = "امنیت اطلاعات شخصی";
	Privacy_Secure_Msg = "یکی از اولویت‌های اصلی ما محافظت از اطلاعات حساب کاربران و جلوگیری از دسترسی‌های غیرمجاز به این اطلاعات است. بر همین اساس:";
	Privacy_Secure_Msg_1 = "تمامی درخواست‌های ارسالی ما با SSL‌ رمزگذاری شده‌اند،";
	Privacy_Secure_Msg_2 = "اطلاعات حساب یا کارت بانکی که در زمان پرداخت وارد می‌کنید، در برنامه‌های اندرویدی پرداخت درون برنامه مارکت‌ها بوده و در سایت و خرید نمایندگان از درگاه‌های پرداخت اینترنتی مانند زرین‌پال یا آی‌دی پی استفاده می‌شود. در سایت یا اپلیکیشن‌ها جهت خرید به درگاه بانکی وارد می‌شوید و از طریق درگاه بانکی خرید مورد نظر را تکمیل می‌کنید";
	Privacy_Secure_Msg_3 = "علی‌رغم تمام رویه‌های ایمنی که ما مطابق با قانون به هنگام ارائه خدمات اتخاذ کرده‌ایم، متاسفانه تدابیر امنیتی را نمی‌توان به صورت صد در صدی تضمین نمود، بنابراین مقتضی است:";
	Privacy_Secure_Msg_4 = "از اطلاعات حساب کاربری خود محافظت کرده و آن‌ها را در اختیار اشخاص ثالث قرار ندهید،";
	Privacy_Secure_Msg_5 = "رمز عبوری را انتخاب نمایید که حتی‌الامکان برای دیگران غیر قابل حدس باشد،";
	Privacy_Secure_Msg_6 = "در صورت وقوع سرقت گوشی همراه و همچنین پیش از واگذاری آدرس ایمیل و شماره تلفنی که با آن حساب کاربری ایجاد کرده‌اید، موضوع را به ما اطلاع دهید تا حساب کاربری شما تعلیق شده یا اطلاعات موجود در آن تغییر کند. در غیر این صورت و در موارد دسترسی اشخاص ثالث به رمز عبور شما، تمامی مسئولیت هرگونه استفاده یا سوءاستفاده از حساب کاربری شما به عهدۀ شخص شماست و ما هیچ‌گونه مسئولیتی در این مورد نخواهیم داشت.";

	Privacy_How_Choose_Title = "شرایط درخواست";
	Privacy_How_Choose_Msg = "شما می توانید درخواست های خود را به نشانی الکترونیکی support@iodynamic.com ارسال نمایید.";
	Privacy_How_Choose_Msg_1 = "ممکن است ما اطلاعاتی را به منظور تأیید هویت و حصول اطمینان از حق دسترسی شما به اطلاعات شخصی، درخواست کنیم. این اقدام با هدف محافظت از اطلاعات و جلوگیری از دسترسی‌های غیرمجاز به اطلاعات شخصی شما انجام می‌شود.";
	Privacy_How_Choose_Msg_2 = "ما هر درخواست را ظرف حداکثر یک هفته پاسخ خواهیم داد مگر آنکه پیچیدگی یا تعدد موضوعات بررسی طولانی‌تری را اقتضا کند؛ در این صورت، اطلاع‌رسانی‌های لازم را انجام خواهیم داد.";

	Privacy_Choose_Title = "شفافیت، حق انتخاب و سؤالات حریم شخصی";
	Privacy_Choose_Msg = "کاربران مختلف نگرانی‌های مختلفی در خصوص حریم شخصی خود دارند. هدف ما شفافیت کامل در خصوص اطلاعاتی است که جمع آوری می‌کنیم، تا بتوانید در خصوص استفاده‌ای که از آنها می شود حق انتخاب داشته باشید. تصمیم گیری در خصوص نحوه دسترسی ما به اطلاعات شخصی و غیرشخصی شما که در بالا عنوان شد، بر عهده شماست. لطفا هر سؤال، ابهام یا دغدغه‌ای دربارۀ حریم شخصی خود دارید به سادگی از طریق ایمیل مطرح کنید. تمامی تیکت‌ها و ایمیل‌ها پاسخ داده می‌شوند و تا حد امکان به پیشنهادهای خوب کاربران ترتیب اثر داده خواهد شد.";




}
