/* Kết nối tri thức — dữ liệu môn học.
   Mỗi môn: vi/ru/en = tên; tp = chủ đề; h = số giờ ôn ở mức phỏng vấn; core = môn trọng tâm;
   qr/qe/qz = từ khoá tìm video (Nga/Anh/Trung); f = trọng tâm ôn phỏng vấn;
   r = tài liệu: [loại, tên, url, ngôn ngữ, ghi chú]. Loại: course, youtube, rutube, vk, free, notes, book, paper, site, tool, data, practice, journal, law, job.
   Sách bản in để url rỗng: trang sẽ tự mở tìm kiếm Google Sách. */
window.KTT_DATA = { tracks: [], subjects: {} };
(function (D) {
var R = ['', ['r_method', 'r_lit', 'r_pub', 'r_practice', 'r_pedagogy', 'r_grants']];
D.tracks = [
  {
    id: 'math', vi: 'Toán ứng dụng', short: 'Toán', ru: 'Прикладная математика', find: 'tech',
    desc: 'Nền móng cho mọi hướng còn lại: giải tích, đại số tuyến tính, xác suất thống kê, phương pháp số, tối ưu, mô hình hoá. Ở mức thạc sĩ thêm giải tích hàm, quá trình ngẫu nhiên, lý thuyết trò chơi, xử lý tín hiệu.',
    levels: {
      bac: [['Фундамент', ['m_calc', 'm_linalg', 'm_ode', 'm_prob', 'm_discrete', 'm_numeric']], ['Информатика и программирование', ['cs_prog', 'cs_algo', 'cs_db']], ['Физика', ['ph_general']]],
      mag: [['Продвинутые математические курсы', ['m_funcan', 'm_complex', 'm_sde']], ['Специализированные модули', ['m_modeling', 'm_optim', 'm_games', 'm_statmod', 'm_signal', 'cv_dip']], ['Современные компьютерные технологии', ['cs_hpc', 'cs_bigdata', 'm_numpde']], ['Методология исследования', ['r_method']]],
      asp: [R],
      tools: [['', ['t_scipy', 't_git', 't_viz']]]
    },
    tips: [
      'Trước khi chọn trường hay vị trí, xin bản kế hoạch đào tạo cụ thể để biết có học máy hay tính toán lượng tử không, rồi bổ sung trước các chủ đề liên quan.',
      'Đừng bỏ qua môn liên ngành: toán ứng dụng mạnh luôn cần vật lý, kinh tế, sinh học hoặc tin học đi kèm.',
      'Ở mọi cấp, quan trọng nhất là biến bài toán thực thành mô hình toán rồi hiện thực bằng mã, không phải học thuộc công thức.'
    ]
  },
  {
    id: 'phys', vi: 'Vật lý ứng dụng và tin học', short: 'Vật lý + tin', ru: 'Прикладная физика и информатика', find: 'tech',
    desc: 'Vật lý đại cương và lý thuyết, xử lý số liệu thí nghiệm, mô phỏng số (Monte-Carlo, động lực học phân tử, FEM, CFD) song song với lập trình, thuật toán, hệ điều hành, mạng, tính toán hiệu năng cao.',
    levels: {
      bac: [['Прикладная физика', ['ph_general', 'ph_theor', 'ph_mathphys', 'ph_lab', 'ph_comp', 'ph_modern']], ['Информатика', ['cs_prog', 'cs_algo', 'm_discrete', 'cs_db', 'cs_os', 'cs_net', 'cs_se']]],
      mag: [['Прикладная физика', ['ph_special', 'ph_measure', 'ph_simul', 'ph_materials']], ['Информатика и вычислительные методы', ['cs_hpc', 'ai_ml', 'm_numpde', 'cs_sci_sw']]],
      asp: [R],
      tools: [['Что особенно важно для «физика + информатика»', ['t_scipy', 't_git', 't_viz']]]
    },
    tips: [
      'Python khoa học (NumPy, SciPy, Matplotlib) cùng các gói chuyên ngành (FEniCS, GROMACS, LAMMPS) là chuẩn thực tế cho mô phỏng và phân tích.',
      'Git và khả năng tái lập (Jupyter, container, CI/CD) giúp kết quả lặp lại được và chuyển giao được cho đồng nghiệp.',
      'Trực quan hoá dữ liệu và kết quả mô phỏng là kỹ năng quan trọng khi trình bày trong bài báo và báo cáo.'
    ]
  },
  {
    id: 'uav', vi: 'UAV và xử lý ảnh', short: 'UAV + ảnh', ru: 'БПЛА и обработка изображений', find: 'tech',
    desc: 'Khí động học, cấu tạo, điều khiển, cảm biến và dẫn đường của UAV; xử lý ảnh số, thị giác máy tính, học sâu cho ảnh, quang trắc và dựng 3D, triển khai mô hình trên máy tính nhúng.',
    levels: {
      bac: [['БПЛА (беспилотные авиационные системы)', ['u_aero', 'u_design', 'u_control', 'u_sensors', 'u_telemetry', 'u_law', 'u_embedded', 'u_robotics']], ['Обработка изображений и компьютерное зрение', ['cv_dip', 'm_linalg', 'm_prob', 'cs_prog', 'cv_intro', 'cs_hpc']]],
      mag: [['БПЛА и автономные системы', ['u_advcontrol', 'u_nav', 'u_mission', 'u_sim', 'u_payload', 'u_security']], ['Обработка изображений и компьютерное зрение', ['cv_dl', 'cv_3d', 'rs_multispec', 'ai_deploy', 'cv_video']]],
      asp: [R],
      tools: [['Ключевые инструменты', ['t_ros', 't_scipy', 't_photogram_sw', 'rs_gis', 't_git', 't_px4']]]
    },
    tips: [
      'Mới bắt đầu thì củng cố toán (đại số tuyến tính, giải tích, thống kê) và Python trước: đó là nền của cả hai nhánh.',
      'Với UAV, nên bắt đầu từ mô phỏng (SITL, Gazebo) và drone học tập cỡ nhỏ để hiểu dẫn đường, điều khiển, cảm biến.',
      'Với xử lý ảnh, đi từ bài đơn giản (lọc, biên, phân đoạn cơ bản) rồi mới sang mạng nơ-ron.',
      'Dự án được đánh giá cao nhất là tự làm trọn chuỗi: bay chụp → dựng ảnh trực giao → phân loại đối tượng.'
    ]
  },
  {
    id: 'ai', vi: 'AI, vệ tinh và dữ liệu vũ trụ', short: 'AI + vũ trụ', ru: 'ИИ, спутники, космические и аэроданные', find: 'tech',
    desc: 'Học máy và học sâu; vệ tinh, cơ học quỹ đạo, điều khiển tư thế, liên lạc; viễn thám quang học, radar SAR, lidar, quang trắc, GIS và xử lý dữ liệu lớn trên Google Earth Engine, STAC, xarray.',
    levels: {
      bac: [['Искусственный интеллект', ['cs_prog', 'm_linalg', 'm_calc', 'm_prob', 'cs_algo', 'ai_ml', 'ai_data', 'cv_intro']], ['Спутники и космические системы', ['ph_general', 's_intro', 's_orbit', 's_adcs', 's_comm', 's_cubesat', 's_law']], ['Космические и аэроданные (ДЗЗ, аэрофото, лидары)', ['rs_basics', 'cv_dip', 'rs_geodesy', 'rs_gis', 'rs_photogram', 'rs_multispec']]],
      mag: [['ИИ и анализ данных', ['ai_dl', 'ai_rl', 'ai_deploy', 'ai_ts', 'ai_xai']], ['Спутники, динамика и управление', ['s_mission', 's_dyn', 's_syseng', 's_sim']], ['Обработка космических и аэроданных', ['cv_3d', 'rs_sar', 'rs_lidar', 'rs_fusion', 'rs_bigdata']]],
      asp: [R],
      tools: [['Ключевые инструменты и навыки', ['t_scipy', 'cv_dl', 't_geo', 'rs_gis', 't_eodata', 's_sim', 'ai_deploy', 't_git', 't_formats']]]
    },
    tips: [
      'Củng cố đại số tuyến tính, thống kê và Python với các thư viện dữ liệu và ảnh trước tiên.',
      'Với vệ tinh, bắt đầu từ cơ học quỹ đạo và mô phỏng đơn giản (GMAT, STK) để thấy giới hạn và khả năng của nhiệm vụ.',
      'Với viễn thám, luyện trên dữ liệu mở (Sentinel, Landsat): ảnh tổng hợp, chỉ số, mặt nạ mây, phân loại đơn giản.',
      'Dự án giá trị nhất là tự dựng pipeline: tải dữ liệu → tiền xử lý → mô hình → đánh giá độ chính xác → trực quan hoá.'
    ]
  },
  {
    id: 'lang', vi: 'Ngôn ngữ: Anh, Trung, Nga', short: 'Ngôn ngữ', ru: 'Английский, китайский и русский языки', find: 'lang',
    desc: 'Ngữ âm, ngữ pháp, từ vựng, phong cách học của ba thứ tiếng; ở mức thạc sĩ là ngôn ngữ học lý thuyết, ngôn ngữ học khối liệu, dịch thuật, xử lý ngôn ngữ tự nhiên, phương pháp giảng dạy.',
    levels: {
      bac: [['Английский язык', ['en_phon', 'en_practical', 'en_grammar', 'en_lex', 'en_style', 'en_hist', 'en_lit', 'l_intercult']], ['Китайский язык', ['zh_phon', 'zh_hanzi', 'zh_grammar', 'zh_practical', 'zh_lex', 'zh_culture', 'zh_transl', 'zh_sinology']], ['Русский язык (как родной и как иностранный)', ['ru_modern', 'ru_style', 'ru_rhetoric', 'ru_hist', 'ru_lit', 'ru_method', 'ru_rki']]],
      mag: [['Лингвистика и теория языка', ['l_theory', 'l_socio', 'l_corpus', 'l_typology']], ['Прикладные направления', ['l_transl', 'l_nlp', 'l_teaching', 'l_discourse']], ['Узкопрофильные курсы по языкам', ['en_academic', 'zh_advanced', 'ru_advanced']]],
      asp: [R],
      tools: [['Ключевые инструменты', ['l_corpus', 'l_transl', 'l_nlp', 'l_teaching', 'r_lit']]]
    },
    tips: [
      'Học đều mỗi ngày 30–60 phút: phát âm, từ vựng, đọc và nghe đúng trình độ.',
      'Tiếng Anh: dùng nhiều phương tiện tiếng Anh và nói chuyện với người bản ngữ. Tiếng Trung: luyện thanh điệu và viết chữ đều đặn. Tiếng Nga: chú ý phong cách và chuẩn mực lời nói.',
      'Ở mức cao, dự án được đánh giá cao là tự thu thập và phân tích dữ liệu: khối liệu, so sánh đối chiếu, bản dịch có bình luận.'
    ]
  },
  {
    id: 'research', vi: 'Kỹ năng nghiên cứu sinh', short: 'Nghiên cứu', ru: 'Аспирантура и научная работа', find: 'soft',
    desc: 'Phần chung của mọi hướng ở bậc аспирантура: phương pháp luận nghiên cứu, làm việc với tài liệu khoa học và trắc lượng, viết bài và thuyết trình, giảng dạy, xin tài trợ, quản lý dự án.',
    levels: {
      asp: [['Общие для всех направлений', ['r_method', 'r_lit', 'r_pub', 'r_practice', 'r_pedagogy', 'r_grants']]],
      tools: [['', ['t_git', 'cs_sci_sw', 't_viz']]]
    },
    tips: [
      'Phần lớn thời gian аспирантура là nghiên cứu dưới hướng dẫn: dựng mô hình, tính toán hoặc thí nghiệm, phân tích kết quả và viết luận án.',
      'Khi phỏng vấn, hãy kể được nghiên cứu của mình trong 2 phút cho người ngoài ngành và trong 10 phút cho chuyên gia.'
    ]
  },
  {
    id: 'career', vi: 'Chuẩn bị phỏng vấn', short: 'Phỏng vấn', ru: 'Подготовка к собеседованию', find: 'soft',
    desc: 'Phần đích đến: CV và portfolio, nơi tìm việc ở Nga và Việt Nam, phỏng vấn kỹ thuật (thuật toán, ML, thiết kế hệ thống), phỏng vấn hành vi theo STAR, tiếng Anh học thuật và công việc.',
    levels: {
      tools: [['Hồ sơ và tìm việc', ['i_cv', 'i_portfolio', 'i_jobs']], ['Vòng phỏng vấn', ['i_tech', 'i_behav', 'en_academic']]]
    },
    tips: [
      'Bắt đầu portfolio ngay từ tháng đầu: mỗi môn học xong để lại một notebook hoặc một đoạn mã nhỏ trên GitHub.',
      'Từ tháng thứ tư, mỗi tuần một buổi phỏng vấn thử có hẹn giờ và ghi âm.'
    ]
  }
];
})(window.KTT_DATA);

(function (S) {
S.m_calc = {
  vi: 'Giải tích', ru: 'Математический анализ', en: 'Calculus and real analysis',
  tp: ['пределы', 'производные', 'интегралы', 'ряды', 'функции многих переменных'], h: 7, core: 1,
  qr: 'математический анализ лекции', qe: 'calculus lecture course',
  f: 'Giới hạn và định nghĩa ε–δ, đạo hàm riêng, gradient và ma trận Hesse, khai triển Taylor, tích phân bội và đổi biến (Jacobian), chuỗi số và chuỗi Fourier. Đây là nền cho tối ưu và học máy.',
  r: [
    ['book', 'Фихтенгольц Г. М. Курс дифференциального и интегрального исчисления (3 тома)', '', 'ru', 'Kinh điển, rất nhiều ví dụ'],
    ['book', 'Зорич В. А. Математический анализ (2 тома)', '', 'ru', 'Hiện đại, chặt chẽ'],
    ['book', 'Демидович Б. П. Сборник задач и упражнений по математическому анализу', '', 'ru', 'Bài tập chuẩn'],
    ['free', 'OpenStax Calculus, Volume 1–3', 'https://openstax.org/details/books/calculus-volume-1', 'en', 'Giáo trình mở, có lời giải'],
    ['free', 'Paul’s Online Math Notes (Lamar University)', 'https://tutorial.math.lamar.edu', 'en', 'Tóm tắt dễ hiểu, giải tích và phương trình vi phân'],
    ['course', 'MIT 18.02SC Multivariable Calculus', 'https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/', 'en', 'Giải tích nhiều biến, video và bài tập'],
    ['course', 'Khan Academy: Calculus', 'https://www.khanacademy.org/math/calculus-1', 'en', 'Video ngắn, bài luyện tự chấm'],
    ['youtube', 'Борис Трушин (канал)', 'https://www.youtube.com/@trushinbv', 'ru', 'Giải thích dễ hiểu toán phổ thông và đại học'],
    ['tool', 'WolframAlpha', 'https://www.wolframalpha.com', 'en', 'Kiểm tra đạo hàm, tích phân, giới hạn']
  ]
};
S.m_linalg = {
  vi: 'Đại số tuyến tính và hình học giải tích', ru: 'Алгебра и аналитическая геометрия', en: 'Linear algebra',
  tp: ['векторы', 'матрицы', 'линейные пространства', 'собственные значения', 'SVD'], h: 9, core: 1,
  qr: 'линейная алгебра лекции', qe: 'linear algebra lecture',
  f: 'Hạng, định thức, nghịch đảo và giả nghịch đảo, trị riêng và vectơ riêng, chéo hoá, phân tích SVD và PCA, bình phương tối thiểu, chuẩn và số điều kiện, ma trận xác định dương. Hay bị hỏi: vì sao PCA dùng SVD của ma trận hiệp phương sai.',
  r: [
    ['book', 'Кострикин А. И. Введение в алгебру', '', 'ru', 'Giáo trình chuẩn của МГУ'],
    ['book', 'Ильин В. А., Позняк Э. Г. Линейная алгебра; Аналитическая геометрия', '', 'ru', 'Dễ đọc, hệ thống'],
    ['book', 'Беклемишев Д. В. Курс аналитической геометрии и линейной алгебры', '', 'ru', 'Có sách bài tập đi kèm'],
    ['free', 'Axler S. Linear Algebra Done Right (bản mở)', 'https://linear.axler.net', 'en', 'Tác giả cho đọc miễn phí bản mới'],
    ['free', 'Deisenroth, Faisal, Ong. Mathematics for Machine Learning', 'https://mml-book.github.io', 'en', 'Đại số tuyến tính, giải tích, xác suất cho ML'],
    ['free', 'Immersive Math: Immersive Linear Algebra', 'http://immersivemath.com/ila/index.html', 'en', 'Sách tương tác, hình động 3D'],
    ['course', 'MIT 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning', 'https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/', 'en', 'Strang, SVD và ứng dụng cho dữ liệu']
  ]
};
S.m_ode = {
  vi: 'Phương trình vi phân và phương trình vật lý toán', ru: 'Дифференциальные уравнения', en: 'Differential equations',
  tp: ['ОДУ', 'системы ОДУ', 'устойчивость', 'уравнения математической физики', 'краевые задачи'], h: 5,
  qr: 'дифференциальные уравнения лекции', qe: 'differential equations lecture',
  f: 'Phân loại phương trình, phương trình tuyến tính hệ số hằng, hệ phương trình và ma trận mũ, ổn định điểm cân bằng (Lyapunov), bài toán Cauchy và bài toán biên, phương trình truyền nhiệt, sóng, Laplace và phương pháp tách biến.',
  r: [
    ['book', 'Понтрягин Л. С. Обыкновенные дифференциальные уравнения', '', 'ru', 'Kinh điển'],
    ['book', 'Филиппов А. Ф. Сборник задач по дифференциальным уравнениям', '', 'ru', 'Bài tập chuẩn'],
    ['book', 'Тихонов А. Н., Самарский А. А. Уравнения математической физики', '', 'ru', 'Vật lý toán kinh điển'],
    ['book', 'Boyce W., DiPrima R. Elementary Differential Equations and Boundary Value Problems', '', 'en', 'Giáo trình phổ biến ở Mỹ'],
    ['site', '3Blue1Brown: Differential equations (bài học)', 'https://www.3blue1brown.com/lessons/differential-equations/', 'en', 'Trực quan, có video'],
    ['youtube', '3Blue1Brown: Differential equations, video 1', 'https://www.youtube.com/watch?v=p_di4Zn4wz4', 'en', 'Mở đầu loạt bài']
  ]
};
S.m_prob = {
  vi: 'Xác suất và thống kê toán', ru: 'Теория вероятностей и математическая статистика', en: 'Probability and statistics',
  tp: ['случайные величины', 'распределения', 'ЦПТ', 'оценки', 'доверительные интервалы', 'проверка гипотез', 'Байес'], h: 10, core: 1,
  qr: 'теория вероятностей и математическая статистика лекции', qe: 'probability and statistics course',
  f: 'Định lý Bayes, phân phối chuẩn, nhị thức, Poisson; kỳ vọng, phương sai, hiệp phương sai; luật số lớn và định lý giới hạn trung tâm; ước lượng hợp lý cực đại; khoảng tin cậy; p-value, sai lầm loại I/II, A/B test; tương quan khác nhân quả; bootstrap.',
  r: [
    ['book', 'Гмурман В. Е. Теория вероятностей и математическая статистика', '', 'ru', 'Dễ đọc, kèm sách hướng dẫn giải bài'],
    ['book', 'Ширяев А. Н. Вероятность (2 тома)', '', 'ru', 'Nâng cao, chặt chẽ'],
    ['book', 'Феллер В. Введение в теорию вероятностей и её приложения', '', 'ru', 'Kinh điển, nhiều ví dụ'],
    ['book', 'Wasserman L. All of Statistics', '', 'en', 'Tổng quan nhanh cho người làm dữ liệu'],
    ['free', 'OpenIntro Statistics', 'https://www.openintro.org/book/os/', 'en', 'Sách mở, nhiều ví dụ thực tế'],
    ['course', 'MIT 18.05 Introduction to Probability and Statistics', 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2014/', 'en', 'Bài giảng, bài tập có lời giải'],
    ['course', 'Harvard Stat 110: Probability (Joe Blitzstein)', 'https://projects.iq.harvard.edu/stat110', 'en', 'Video bài giảng, sách miễn phí'],
    ['youtube', 'StatQuest with Josh Starmer', 'https://www.youtube.com/@statquest', 'en', 'Thống kê và ML giải thích rất dễ hiểu']
  ]
};
S.m_discrete = {
  vi: 'Toán rời rạc', ru: 'Дискретная математика', en: 'Discrete mathematics',
  tp: ['комбинаторика', 'математическая логика', 'теория графов', 'булевы функции'], h: 5,
  qr: 'дискретная математика лекции', qe: 'discrete mathematics lecture',
  f: 'Tổ hợp (hoán vị, chỉnh hợp, nhị thức Newton, bao hàm loại trừ), quy nạp, logic mệnh đề, hàm Boole và dạng chuẩn, đồ thị (duyệt BFS/DFS, cây khung nhỏ nhất, đường đi ngắn nhất, đồ thị hai phía), quan hệ tương đương.',
  r: [
    ['book', 'Новиков Ф. А. Дискретная математика для программистов', '', 'ru', 'Hướng cho người lập trình'],
    ['book', 'Гаврилов Г. П., Сапоженко А. А. Задачи и упражнения по дискретной математике', '', 'ru', 'Bài tập'],
    ['book', 'Rosen K. Discrete Mathematics and Its Applications', '', 'en', 'Giáo trình phổ biến'],
    ['course', 'MIT 6.042J Mathematics for Computer Science', 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/', 'en', 'Có sách miễn phí kèm theo']
  ]
};
S.m_numeric = {
  vi: 'Phương pháp số', ru: 'Численные методы', en: 'Numerical methods',
  tp: ['погрешности', 'СЛАУ', 'нелинейные уравнения', 'интерполяция', 'численное интегрирование', 'ОДУ'], h: 6, core: 1,
  qr: 'численные методы лекции', qe: 'numerical methods lecture',
  f: 'Sai số làm tròn và số điều kiện, giải hệ tuyến tính (Gauss, LU, Cholesky, Jacobi, Gauss–Seidel, gradient liên hợp), phương pháp Newton, nội suy và spline, tích phân số, Euler và Runge–Kutta, tính ổn định của sơ đồ.',
  r: [
    ['book', 'Самарский А. А., Гулин А. В. Численные методы', '', 'ru', 'Giáo trình chuẩn'],
    ['book', 'Бахвалов Н. С., Жидков Н. П., Кобельков Г. М. Численные методы', '', 'ru', 'Kinh điển МГУ'],
    ['book', 'Калиткин Н. Н. Численные методы', '', 'ru', 'Thiên về thực hành'],
    ['free', 'Numerical Recipes (bản đọc trực tuyến)', 'https://numerical.recipes', 'en', 'Thuật toán kèm mã'],
    ['free', 'Python Programming and Numerical Methods (UC Berkeley)', 'https://pythonnumericalmethods.berkeley.edu', 'en', 'Phương pháp số bằng Python, sách mở']
  ]
};
S.m_funcan = {
  vi: 'Giải tích hàm', ru: 'Функциональный анализ', en: 'Functional analysis',
  tp: ['метрические пространства', 'банаховы и гильбертовы пространства', 'линейные операторы', 'принцип сжатых отображений'], h: 5,
  qr: 'функциональный анализ лекции', qe: 'functional analysis lecture',
  f: 'Không gian metric, định chuẩn, Banach, Hilbert; toán tử tuyến tính bị chặn; cơ sở trực chuẩn và chuỗi Fourier tổng quát; nguyên lý ánh xạ co; không gian Sobolev ở mức khái niệm. Liên hệ: phương pháp phần tử hữu hạn, hàm nhân (kernel) trong học máy.',
  r: [
    ['book', 'Колмогоров А. Н., Фомин С. В. Элементы теории функций и функционального анализа', '', 'ru', 'Kinh điển'],
    ['book', 'Треногин В. А. Функциональный анализ', '', 'ru', 'Dễ đọc hơn'],
    ['book', 'Kreyszig E. Introductory Functional Analysis with Applications', '', 'en', 'Nhiều ứng dụng'],
    ['course', 'MIT 18.102 Introduction to Functional Analysis', 'https://ocw.mit.edu/courses/18-102-introduction-to-functional-analysis-spring-2021/', 'en', 'Có video bài giảng']
  ]
};
S.m_complex = {
  vi: 'Hàm biến phức', ru: 'Теория функций комплексного переменного', en: 'Complex analysis',
  tp: ['аналитические функции', 'интеграл Коши', 'ряды Лорана', 'вычеты', 'конформные отображения'], h: 4,
  qr: 'ТФКП лекции', qe: 'complex analysis lecture',
  f: 'Điều kiện Cauchy–Riemann, tích phân Cauchy, chuỗi Taylor và Laurent, thặng dư và tính tích phân, ánh xạ bảo giác; biến đổi Laplace và Fourier dùng trong xử lý tín hiệu và điều khiển.',
  r: [
    ['book', 'Лаврентьев М. А., Шабат Б. В. Методы теории функций комплексного переменного', '', 'ru', 'Kinh điển'],
    ['book', 'Свешников А. Г., Тихонов А. Н. Теория функций комплексной переменной', '', 'ru', 'Giáo trình МГУ'],
    ['book', 'Волковыский Л. И., Лунц Г. Л., Араманович И. Г. Сборник задач по теории функций комплексного переменного', '', 'ru', 'Bài tập'],
    ['course', 'MIT 18.04 Complex Variables with Applications', 'https://ocw.mit.edu/courses/18-04-complex-variables-with-applications-spring-2018/', 'en', 'Bài giảng và bài tập']
  ]
};
S.m_sde = {
  vi: 'Quá trình ngẫu nhiên và phương trình vi phân ngẫu nhiên', ru: 'Случайные процессы и стохастические дифференциальные уравнения', en: 'Stochastic processes and SDE',
  tp: ['цепи Маркова', 'пуассоновский процесс', 'броуновское движение', 'интеграл Ито', 'уравнение Фоккера–Планка'], h: 5,
  qr: 'теория случайных процессов лекции', qe: 'stochastic differential equations lecture',
  f: 'Chuỗi Markov và phân phối dừng, quá trình Poisson, chuyển động Brown, tích phân Itô và bổ đề Itô, phương trình Fokker–Planck, mô phỏng Euler–Maruyama; liên hệ với lọc Kalman và mô hình dự báo.',
  r: [
    ['book', 'Вентцель А. Д. Курс теории случайных процессов', '', 'ru', 'Giáo trình chuẩn'],
    ['book', 'Оксендаль Б. Стохастические дифференциальные уравнения', '', 'ru', 'Bản dịch của Øksendal'],
    ['book', 'Särkkä S., Solin A. Applied Stochastic Differential Equations', '', 'en', 'Thiên ứng dụng, có mã'],
    ['course', 'MIT 18.S096 Topics in Mathematics with Applications in Finance', 'https://ocw.mit.edu/courses/18-s096-topics-in-mathematics-with-applications-in-finance-fall-2013/', 'en', 'Có bài giảng về giải tích Itô'],
    ['course', 'MIT 6.262 Discrete Stochastic Processes', 'https://ocw.mit.edu/courses/6-262-discrete-stochastic-processes-spring-2011/', 'en', 'Chuỗi Markov, quá trình Poisson']
  ]
};
S.m_modeling = {
  vi: 'Mô hình hoá toán học hệ phức tạp', ru: 'Математическое моделирование сложных систем', en: 'Mathematical modeling',
  tp: ['постановка задачи', 'обезразмеривание', 'динамические системы', 'агентные модели', 'системная динамика'], h: 5,
  qr: 'математическое моделирование лекции', qe: 'mathematical modeling course',
  f: 'Quy trình mô hình hoá: giả thiết, phương trình, đưa về dạng không thứ nguyên, giải, kiểm định với dữ liệu. Ví dụ hay gặp: tăng trưởng logistic, mô hình dịch bệnh SIR, hệ thú–mồi, mô hình tác tử, mô hình CA–Markov cho biến động sử dụng đất.',
  r: [
    ['book', 'Самарский А. А., Михайлов А. П. Математическое моделирование: идеи, методы, примеры', '', 'ru', 'Kinh điển của trường phái Nga'],
    ['book', 'Мышкис А. Д. Элементы теории математических моделей', '', 'ru', 'Nguyên lý xây dựng mô hình'],
    ['book', 'Bender E. A. An Introduction to Mathematical Modeling', '', 'en', 'Ngắn, nhiều ví dụ'],
    ['course', 'MIT 18.S191 Introduction to Computational Thinking', 'https://computationalthinking.mit.edu', 'en', 'Mô hình khí hậu, dịch bệnh bằng Julia'],
    ['free', 'Brunton S., Kutz J. N. Data-Driven Science and Engineering', 'https://databookuw.com', 'en', 'Mô hình hoá từ dữ liệu, có video'],
    ['tool', 'AnyLogic', 'https://www.anylogic.ru', 'ru', 'Mô hình tác tử, động lực hệ thống; có bản học tập']
  ]
};
S.m_optim = {
  vi: 'Phương pháp tối ưu', ru: 'Методы оптимизации', en: 'Optimization methods',
  tp: ['выпуклость', 'условия ККТ', 'двойственность', 'градиентные методы', 'линейное программирование'], h: 8, core: 1,
  qr: 'методы оптимизации лекции', qe: 'convex optimization lecture',
  f: 'Hàm và tập lồi, điều kiện KKT, đối ngẫu Lagrange, gradient descent, SGD, momentum, Adam, Newton và quasi-Newton (BFGS), quy hoạch tuyến tính, tối ưu có ràng buộc, tối ưu siêu tham số (grid, random, Bayes).',
  r: [
    ['book', 'Поляк Б. Т. Введение в оптимизацию', '', 'ru', 'Kinh điển, nhiều trực giác'],
    ['book', 'Сухарев А. Г., Тимохов А. В., Фёдоров В. В. Курс методов оптимизации', '', 'ru', 'Giáo trình МГУ'],
    ['book', 'Nocedal J., Wright S. Numerical Optimization', '', 'en', 'Tham khảo chuẩn về thuật toán'],
    ['site', 'fmin.xyz: Методы оптимизации (Д. Меркулов, МФТИ)', 'https://fmin.xyz', 'ru', 'Ghi chú, bài tập, hình động'],
    ['tool', 'CVXPY', 'https://www.cvxpy.org', 'en', 'Mô hình hoá bài toán lồi trong Python'],
    ['tool', 'Optuna', 'https://optuna.org', 'en', 'Tối ưu siêu tham số']
  ]
};
S.m_games = {
  vi: 'Lý thuyết trò chơi', ru: 'Теория игр', en: 'Game theory',
  tp: ['равновесие Нэша', 'смешанные стратегии', 'антагонистические игры', 'кооперативные игры', 'вектор Шепли'], h: 4,
  qr: 'теория игр лекции', qe: 'game theory lecture',
  f: 'Cân bằng Nash (thuần và hỗn hợp), trò chơi tổng bằng không và minimax, trò chơi lặp, cân bằng hoàn hảo trò chơi con, đấu giá, trò chơi hợp tác và giá trị Shapley (cũng là nền của SHAP trong AI giải thích được).',
  r: [
    ['book', 'Петросян Л. А., Зенкевич Н. А., Шевкопляс Е. В. Теория игр', '', 'ru', 'Giáo trình СПбГУ'],
    ['book', 'Мазалов В. В. Математическая теория игр и приложения', '', 'ru', 'Nhiều ứng dụng'],
    ['book', 'Osborne M. An Introduction to Game Theory', '', 'en', 'Nhập môn dễ đọc'],
    ['course', 'Coursera: Game Theory (Stanford, UBC)', 'https://www.coursera.org/learn/game-theory-1', 'en', 'Học miễn phí ở chế độ dự thính']
  ]
};
S.m_statmod = {
  vi: 'Mô hình thống kê, Monte-Carlo, bootstrap', ru: 'Статистическое моделирование', en: 'Statistical simulation',
  tp: ['метод Монте-Карло', 'MCMC', 'бутстреп', 'кросс-валидация', 'генерация случайных чисел'], h: 5,
  qr: 'метод Монте-Карло лекции', qe: 'Monte Carlo methods lecture',
  f: 'Sinh số giả ngẫu nhiên, phương pháp Monte-Carlo và giảm phương sai, MCMC (Metropolis–Hastings, Gibbs), bootstrap để ước lượng độ bất định, kiểm định chéo; ví dụ: khoảng tin cậy cho độ chính xác phân loại ảnh.',
  r: [
    ['book', 'Соболь И. М. Численные методы Монте-Карло', '', 'ru', 'Kinh điển'],
    ['book', 'Ермаков С. М. Метод Монте-Карло в вычислительной математике', '', 'ru', 'Giáo trình СПбГУ'],
    ['free', 'Efron B., Hastie T. Computer Age Statistical Inference', 'https://hastie.su.domains/CASI/', 'en', 'Tác giả cho tải miễn phí'],
    ['free', 'James, Witten, Hastie, Tibshirani. An Introduction to Statistical Learning (ISLR, ISLP)', 'https://www.statlearning.com', 'en', 'Bản R và Python miễn phí'],
    ['youtube', 'Richard McElreath: Statistical Rethinking', 'https://www.youtube.com/@rmcelreath', 'en', 'Thống kê Bayes, bài giảng đầy đủ'],
    ['tool', 'PyMC', 'https://www.pymc.io', 'en', 'Mô hình Bayes, MCMC trong Python'],
    ['tool', 'statsmodels', 'https://www.statsmodels.org', 'en', 'Thống kê, hồi quy, chuỗi thời gian']
  ]
};
S.m_signal = {
  vi: 'Xử lý tín hiệu số', ru: 'Цифровая обработка сигналов', en: 'Digital signal processing',
  tp: ['дискретизация', 'ДПФ и БПФ', 'свёртка', 'цифровые фильтры', 'вейвлеты'], h: 6, core: 1,
  qr: 'цифровая обработка сигналов лекции', qe: 'digital signal processing lecture',
  f: 'Định lý lấy mẫu Nyquist–Shannon và hiện tượng chồng phổ, DFT và FFT, tích chập, bộ lọc FIR và IIR, hàm cửa sổ, mật độ phổ công suất, wavelet; ứng dụng lọc nhiễu ảnh và phân tích chuỗi thời gian vệ tinh.',
  r: [
    ['book', 'Оппенгейм А., Шафер Р. Цифровая обработка сигналов', '', 'ru', 'Kinh điển'],
    ['book', 'Сергиенко А. Б. Цифровая обработка сигналов', '', 'ru', 'Có ví dụ MATLAB'],
    ['book', 'Лайонс Р. Цифровая обработка сигналов', '', 'ru', 'Dễ đọc, trực quan'],
    ['free', 'Downey A. Think DSP', 'https://greenteapress.com/wp/think-dsp/', 'en', 'Xử lý tín hiệu bằng Python, miễn phí'],
    ['course', 'MIT 6.003 Signals and Systems', 'https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/', 'en', 'Video bài giảng'],
    ['site', 'SciPy: scipy.signal', 'https://docs.scipy.org/doc/scipy/reference/signal.html', 'en', 'Lọc, phổ, wavelet trong Python']
  ]
};
S.m_numpde = {
  vi: 'Phương pháp số cho phương trình đạo hàm riêng', ru: 'Численные методы для задач физики', en: 'Numerical PDE',
  tp: ['разностные схемы', 'устойчивость', 'МКЭ', 'спектральные методы', 'большие разреженные СЛАУ'], h: 6,
  qr: 'разностные схемы метод конечных элементов лекции', qe: 'numerical methods for PDE lecture',
  f: 'Sai phân hữu hạn (hiện, ẩn, Crank–Nicolson), điều kiện CFL và phân tích ổn định von Neumann, phần tử hữu hạn (dạng yếu, lưới), thể tích hữu hạn, phương pháp phổ, giải hệ thưa lớn (CG, GMRES, tiền điều kiện).',
  r: [
    ['book', 'Самарский А. А. Теория разностных схем', '', 'ru', 'Kinh điển'],
    ['book', 'Годунов С. К., Рябенький В. С. Разностные схемы', '', 'ru', 'Nhập môn'],
    ['book', 'LeVeque R. Finite Difference Methods for Ordinary and Partial Differential Equations', '', 'en', 'Thực hành tốt'],
    ['course', 'Barba L. 12 steps to Navier–Stokes (CFD Python)', 'https://github.com/barbagroup/CFDPython', 'en', 'Notebook từng bước'],
    ['tool', 'FEniCS Project', 'https://fenicsproject.org', 'en', 'Giải PDE bằng phần tử hữu hạn trong Python']
  ]
};
})(window.KTT_DATA.subjects);

(function (S) {
S.ph_general = {
  vi: 'Vật lý đại cương', ru: 'Общая физика', en: 'General physics',
  tp: ['механика', 'молекулярная физика', 'электричество и магнетизм', 'оптика', 'атомная и ядерная физика'], h: 9,
  qr: 'общая физика лекции', qe: 'physics lectures university',
  f: 'Định luật Newton và các định luật bảo toàn, dao động và sóng, nhiệt động học (các nguyên lý, entropy), phương trình Maxwell, giao thoa và nhiễu xạ, bức xạ vật đen (Planck, Wien, Stefan–Boltzmann): nền vật lý cho viễn thám nhiệt và quang học.',
  r: [
    ['book', 'Савельев И. В. Курс общей физики', '', 'ru', 'Giáo trình phổ biến'],
    ['book', 'Сивухин Д. В. Общий курс физики (5 томов)', '', 'ru', 'Sâu, giáo trình МФТИ'],
    ['book', 'Иродов И. Е. Задачи по общей физике', '', 'ru', 'Bài tập kinh điển'],
    ['book', 'Halliday D., Resnick R., Walker J. Fundamentals of Physics', '', 'en', 'Giáo trình phổ biến ở Mỹ'],
    ['course', 'MIT 8.01SC Classical Mechanics', 'https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/', 'en', 'Video, bài tập'],
    ['course', 'MIT 8.02 Physics II: Electricity and Magnetism', 'https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2007/', 'en', 'Điện từ học'],
    ['site', 'Лекторий МФТИ', 'https://lectoriy.mipt.ru', 'ru', 'Kho video bài giảng МФТИ'],
    ['tool', 'PhET Interactive Simulations', 'https://phet.colorado.edu/ru/', 'ru', 'Mô phỏng tương tác, có tiếng Nga']
  ]
};
S.ph_theor = {
  vi: 'Vật lý lý thuyết', ru: 'Теоретическая физика', en: 'Theoretical physics',
  tp: ['теоретическая механика', 'электродинамика', 'термодинамика и статфизика', 'квантовая механика'], h: 8,
  qr: 'теоретическая физика лекции', qe: 'theoretical physics lectures',
  f: 'Cơ học Lagrange và Hamilton, phương trình Maxwell dạng vi phân và sóng điện từ, phân bố Boltzmann và Gibbs, phương trình Schrödinger, giếng thế, dao động tử điều hoà lượng tử.',
  r: [
    ['book', 'Ландау Л. Д., Лифшиц Е. М. Теоретическая физика (10 томов)', '', 'ru', 'Bộ kinh điển'],
    ['book', 'Griffiths D. Introduction to Electrodynamics; Introduction to Quantum Mechanics', '', 'en', 'Dễ đọc nhất'],
    ['site', 'Susskind L. The Theoretical Minimum', 'https://theoreticalminimum.com', 'en', 'Bài giảng Stanford, có video'],
    ['site', 'Teach-In: лекции МГУ', 'https://teach-in.ru', 'ru', 'Kho video bài giảng МГУ']
  ]
};
S.ph_mathphys = {
  vi: 'Phương pháp vật lý toán', ru: 'Методы математической физики', en: 'Mathematical methods of physics',
  tp: ['разделение переменных', 'функция Грина', 'специальные функции', 'задача Штурма–Лиувилля', 'векторный анализ'], h: 5,
  qr: 'методы математической физики лекции', qe: 'mathematical methods for physics lecture',
  f: 'Tách biến, chuỗi và biến đổi Fourier, hàm Green, hàm đặc biệt (Bessel, Legendre), bài toán Sturm–Liouville, giải tích vectơ (grad, div, rot, định lý Gauss–Ostrogradsky và Stokes).',
  r: [
    ['book', 'Владимиров В. С. Уравнения математической физики', '', 'ru', 'Kinh điển'],
    ['book', 'Арфкен Г. Математические методы в физике', '', 'ru', 'Tra cứu tốt'],
    ['book', 'Boas M. Mathematical Methods in the Physical Sciences', '', 'en', 'Dễ tiếp cận']
  ]
};
S.ph_lab = {
  vi: 'Thực hành vật lý và xử lý số liệu thí nghiệm', ru: 'Физический практикум и обработка экспериментальных данных', en: 'Lab work and error analysis',
  tp: ['погрешности', 'неопределённость измерений', 'МНК', 'аппроксимация'], h: 4, core: 1,
  qr: 'обработка результатов эксперимента погрешности', qe: 'error analysis measurement uncertainty',
  f: 'Sai số hệ thống và ngẫu nhiên, lan truyền sai số, độ không đảm bảo đo theo GUM (loại A, loại B), bình phương tối thiểu và khớp đường cong, kiểm định χ², chữ số có nghĩa.',
  r: [
    ['book', 'Тейлор Дж. Введение в теорию ошибок', '', 'ru', 'Bản dịch kinh điển của Taylor'],
    ['book', 'Сквайрс Дж. Практическая физика', '', 'ru', 'Thực hành đo đạc'],
    ['book', 'Hughes I., Hase T. Measurements and their Uncertainties', '', 'en', 'Ngắn gọn, hiện đại'],
    ['site', 'BIPM: JCGM GUM (Guide to the Expression of Uncertainty in Measurement)', 'https://www.bipm.org/en/committees/jc/jcgm/publications', 'en', 'Chuẩn quốc tế về độ không đảm bảo đo'],
    ['tool', 'lmfit', 'https://lmfit.github.io/lmfit-py/', 'en', 'Khớp đường cong có ước lượng sai số'],
    ['tool', 'uncertainties (Python)', 'https://pypi.org/project/uncertainties/', 'en', 'Lan truyền sai số tự động']
  ]
};
S.ph_comp = {
  vi: 'Vật lý tính toán', ru: 'Вычислительные методы в физике', en: 'Computational physics',
  tp: ['интегрирование уравнений движения', 'метод Монте-Карло', 'БПФ', 'уравнение Пуассона'], h: 6, core: 1,
  qr: 'вычислительная физика численные методы', qe: 'computational physics python',
  f: 'Tích phân phương trình chuyển động (Verlet, RK4), Monte-Carlo (mô hình Ising), FFT trong vật lý, giải phương trình Poisson và khuếch tán bằng sai phân, trực quan hoá kết quả.',
  r: [
    ['book', 'Гулд Х., Тобочник Я. Компьютерное моделирование в физике', '', 'ru', 'Bản dịch kinh điển'],
    ['book', 'Landau R., Páez M. Computational Physics: Problem Solving with Python', '', 'en', 'Có mã Python'],
    ['site', 'CompPhysics (M. Hjorth-Jensen, Univ. Oslo)', 'https://github.com/CompPhysics', 'en', 'Bài giảng và notebook mở']
  ]
};
S.ph_modern = {
  vi: 'Các hướng vật lý hiện đại (tổng quan)', ru: 'Введение в современные направления физики', en: 'Modern physics overview',
  tp: ['физика конденсированного состояния', 'фотоника', 'физика плазмы'], h: 4,
  qr: 'физика конденсированного состояния лекции', qe: 'condensed matter physics introduction',
  f: 'Mạng tinh thể và vùng năng lượng, bán dẫn, laser cơ bản, plasma, vật liệu quang tử: đủ để trao đổi liên ngành.',
  r: [
    ['book', 'Киттель Ч. Введение в физику твёрдого тела', '', 'ru', 'Kinh điển'],
    ['book', 'Ашкрофт Н., Мермин Н. Физика твёрдого тела', '', 'ru', 'Nâng cao'],
    ['book', 'Chen F. Introduction to Plasma Physics and Controlled Fusion', '', 'en', 'Nhập môn plasma'],
    ['book', 'Saleh B., Teich M. Fundamentals of Photonics', '', 'en', 'Quang tử học'],
    ['site', 'Элементы большой науки', 'https://elementy.ru', 'ru', 'Bài phổ biến khoa học chất lượng'],
    ['journal', 'Успехи физических наук (УФН)', 'https://ufn.ru', 'ru', 'Tạp chí tổng quan vật lý hàng đầu của Nga']
  ]
};
S.ph_special = {
  vi: 'Vật lý bán dẫn, quang học và laser', ru: 'Физика полупроводников, оптика и лазеры', en: 'Semiconductors, optics, lasers',
  tp: ['p-n переход', 'фотоэффект', 'ПЗС и КМОП матрицы', 'лазеры', 'оптическая передаточная функция'], h: 5,
  qr: 'физика полупроводников оптика лазеры лекции', qe: 'semiconductor physics optics lasers lecture',
  f: 'Tiếp giáp p-n, hiệu ứng quang điện, cảm biến CCD và CMOS (liên hệ camera vệ tinh, UAV), laser và lidar, quang sai, hàm truyền điều biến MTF.',
  r: [
    ['book', 'Шалимова К. В. Физика полупроводников', '', 'ru', 'Giáo trình chuẩn'],
    ['book', 'Зи С. Физика полупроводниковых приборов', '', 'ru', 'Bản dịch của Sze'],
    ['book', 'Звелто О. Принципы лазеров', '', 'ru', 'Bản dịch của Svelto'],
    ['book', 'Борн М., Вольф Э. Основы оптики', '', 'ru', 'Kinh điển quang học'],
    ['free', 'OpenStax University Physics, Volume 3 (quang học, vật lý hiện đại)', 'https://openstax.org/details/books/university-physics-volume-3', 'en', 'Sách mở']
  ]
};
S.ph_measure = {
  vi: 'Đo lường, cảm biến, điện tử và tự động hoá thí nghiệm', ru: 'Современные методы измерений и обработки данных', en: 'Measurement, sensors, electronics',
  tp: ['датчики', 'АЦП', 'шумы и фильтрация', 'интерфейсы I2C/SPI/UART', 'автоматизация эксперимента'], h: 5,
  qr: 'датчики электроника измерения лекции', qe: 'sensors electronics measurement course',
  f: 'Mạch khuếch đại thuật toán, ADC/DAC và độ phân giải, nhiễu và lọc, cảm biến nhiệt, áp suất, quán tính, quang; giao tiếp I2C, SPI, UART; tự động hoá thí nghiệm bằng Python.',
  r: [
    ['book', 'Хоровиц П., Хилл У. Искусство схемотехники', '', 'ru', 'Kinh điển điện tử'],
    ['book', 'Фрайден Дж. Современные датчики. Справочник', '', 'ru', 'Bản dịch của Fraden'],
    ['free', 'All About Circuits: Textbook', 'https://www.allaboutcircuits.com/textbook/', 'en', 'Giáo trình điện tử miễn phí'],
    ['tool', 'PyVISA', 'https://pyvisa.readthedocs.io', 'en', 'Điều khiển thiết bị đo bằng Python']
  ]
};
S.ph_simul = {
  vi: 'Mô phỏng máy tính hệ vật lý', ru: 'Компьютерное моделирование физических систем', en: 'Computer simulation of physical systems',
  tp: ['метод Монте-Карло', 'молекулярная динамика', 'МКЭ', 'CFD'], h: 7, core: 1,
  qr: 'молекулярная динамика метод конечных элементов CFD лекции', qe: 'molecular dynamics finite element CFD course',
  f: 'Monte-Carlo (Metropolis), động lực học phân tử (thế Lennard-Jones, bộ ổn nhiệt), phương pháp phần tử hữu hạn (lưới, dạng yếu), CFD (Navier–Stokes, mô hình rối); biết chọn phương pháp nào cho bài toán nào.',
  r: [
    ['book', 'Frenkel D., Smit B. Understanding Molecular Simulation', '', 'en', 'Chuẩn cho MD và Monte-Carlo'],
    ['book', 'Зенкевич О. Метод конечных элементов в технике', '', 'ru', 'Kinh điển FEM'],
    ['book', 'Патанкар С. Численные методы решения задач теплообмена и динамики жидкости', '', 'ru', 'Thể tích hữu hạn'],
    ['book', 'Ferziger J., Perić M. Computational Methods for Fluid Dynamics', '', 'en', 'CFD'],
    ['tool', 'LAMMPS', 'https://www.lammps.org', 'en', 'Động lực học phân tử'],
    ['tool', 'GROMACS', 'https://www.gromacs.org', 'en', 'Động lực học phân tử sinh học'],
    ['tool', 'OpenFOAM', 'https://www.openfoam.com', 'en', 'CFD mã nguồn mở'],
    ['tool', 'FEniCS Project', 'https://fenicsproject.org', 'en', 'Phần tử hữu hạn trong Python']
  ]
};
S.ph_materials = {
  vi: 'Vật lý vật liệu và công nghệ nano', ru: 'Физика материалов и нанотехнологии', en: 'Materials physics and nanotechnology',
  tp: ['структура и свойства', 'дефекты', 'наноматериалы', 'методы характеризации'], h: 4,
  qr: 'физика материалов нанотехнологии лекции', qe: 'materials science nanotechnology lecture',
  f: 'Quan hệ cấu trúc và tính chất, khuyết tật tinh thể, hiệu ứng kích thước nano, các phương pháp đặc trưng (XRD, SEM, AFM), cơ sở dữ liệu vật liệu và học máy cho vật liệu.',
  r: [
    ['book', 'Пул Ч., Оуэнс Ф. Нанотехнологии', '', 'ru', 'Nhập môn'],
    ['book', 'Callister W. Materials Science and Engineering: An Introduction', '', 'en', 'Giáo trình chuẩn'],
    ['data', 'Materials Project', 'https://materialsproject.org', 'en', 'Cơ sở dữ liệu vật liệu mở']
  ]
};
S.cs_prog = {
  vi: 'Lập trình (Python, C++)', ru: 'Программирование', en: 'Programming (Python, C++)',
  tp: ['Python', 'C++', 'ООП', 'исключения', 'управление памятью', 'STL'], h: 10, core: 1,
  qr: 'программирование на Python курс лекции', qe: 'python programming course',
  f: 'Kiểu dữ liệu và độ phức tạp thao tác của list, dict, set; OOP (kế thừa, đa hình, đóng gói); iterator, generator, decorator; ngoại lệ; tham chiếu và sao chép; trong C++: con trỏ, tham chiếu, RAII, smart pointer, STL; viết mã sạch và kiểm thử.',
  r: [
    ['book', 'Лутц М. Изучаем Python', '', 'ru', 'Toàn diện'],
    ['book', 'Рамальо Л. Python. К вершинам мастерства (Fluent Python)', '', 'ru', 'Nâng cao'],
    ['book', 'Страуструп Б. Программирование. Принципы и практика с использованием C++', '', 'ru', 'C++ từ tác giả ngôn ngữ'],
    ['course', 'CS50’s Introduction to Programming with Python (Harvard)', 'https://cs50.harvard.edu/python/', 'en', 'Miễn phí, có bài tập chấm tự động'],
    ['course', 'CS50x Introduction to Computer Science (Harvard)', 'https://cs50.harvard.edu/x/', 'en', 'Nhập môn khoa học máy tính'],
    ['free', 'Think Python, 3rd edition (Allen Downey)', 'https://allendowney.github.io/ThinkPython/', 'en', 'Sách mở dạng notebook'],
    ['site', 'Learn C++', 'https://www.learncpp.com', 'en', 'Giáo trình C++ trực tuyến tốt nhất'],
    ['site', 'cppreference (tiếng Nga)', 'https://ru.cppreference.com', 'ru', 'Tra cứu chuẩn C++'],
    ['site', 'Python: The Python Tutorial', 'https://docs.python.org/3/tutorial/', 'en', 'Tài liệu chính thức'],
    ['practice', 'Exercism', 'https://exercism.org', 'en', 'Bài tập có người hướng dẫn nhận xét'],
    ['practice', 'Codewars', 'https://www.codewars.com', 'en', 'Bài nhỏ theo cấp độ']
  ]
};
S.cs_algo = {
  vi: 'Thuật toán và cấu trúc dữ liệu', ru: 'Алгоритмы и структуры данных', en: 'Algorithms and data structures',
  tp: ['O-нотация', 'сортировки', 'хеш-таблицы', 'деревья', 'графы', 'динамическое программирование'], h: 12, core: 1,
  qr: 'алгоритмы и структуры данных лекции', qe: 'algorithms data structures course',
  f: 'Big-O, sắp xếp (quick, merge, heap), tìm kiếm nhị phân, bảng băm, cây (BST, heap, trie), đồ thị (BFS, DFS, Dijkstra, sắp xếp topo), quy hoạch động, hai con trỏ và cửa sổ trượt: đúng các dạng hay gặp khi lập trình trực tiếp.',
  r: [
    ['book', 'Кормен Т. и др. Алгоритмы: построение и анализ', '', 'ru', 'Kinh điển CLRS'],
    ['book', 'Бхаргава А. Грокаем алгоритмы', '', 'ru', 'Rất dễ đọc, nhiều hình'],
    ['book', 'Седжвик Р. Алгоритмы на C++', '', 'ru', 'Thực hành'],
    ['course', 'MIT 6.006 Introduction to Algorithms', 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/', 'en', 'Video, bài tập'],
    ['site', 'e-maxx: Алгоритмы', 'http://e-maxx.ru/algo/', 'ru', 'Tuyển tập thuật toán thi đấu'],
    ['site', 'cp-algorithms', 'https://cp-algorithms.com', 'en', 'Bản tiếng Anh mở rộng của e-maxx'],
    ['tool', 'VisuAlgo', 'https://visualgo.net', 'en', 'Hình động cho cấu trúc dữ liệu'],
    ['practice', 'LeetCode', 'https://leetcode.com', 'en', 'Luyện bài phỏng vấn'],
    ['practice', 'Codeforces', 'https://codeforces.com', 'ru', 'Thi lập trình'],
    ['practice', 'Timus Online Judge', 'https://acm.timus.ru', 'ru', 'Kho bài tập Nga']
  ]
};
S.cs_db = {
  vi: 'Cơ sở dữ liệu và SQL', ru: 'Базы данных и SQL', en: 'Databases and SQL',
  tp: ['SQL', 'JOIN', 'оконные функции', 'индексы', 'нормализация', 'транзакции', 'PostGIS'], h: 6, core: 1,
  qr: 'SQL базы данных курс', qe: 'SQL databases course',
  f: 'Các loại JOIN, GROUP BY và HAVING, hàm cửa sổ, chỉ mục (B-tree, GiST cho dữ liệu không gian), chuẩn hoá 1NF–3NF, giao dịch và ACID, PostGIS (ST_Intersects, ST_Buffer, ST_Transform).',
  r: [
    ['book', 'Дейт К. Введение в системы баз данных', '', 'ru', 'Kinh điển'],
    ['book', 'Клеппман М. Высоконагруженные приложения (Designing Data-Intensive Applications)', '', 'ru', 'Thiết kế hệ dữ liệu'],
    ['site', 'Документация PostgreSQL на русском (Postgres Pro)', 'https://postgrespro.ru/docs/postgresql', 'ru', 'Tài liệu chính thức'],
    ['course', 'CMU 15-445 Database Systems', 'https://15445.courses.cs.cmu.edu', 'en', 'Bài giảng và video'],
    ['practice', 'SQL-EX', 'https://www.sql-ex.ru', 'ru', 'Luyện SQL tiếng Nga'],
    ['practice', 'SQLBolt', 'https://sqlbolt.com', 'en', 'Bài học tương tác'],
    ['practice', 'PostgreSQL Exercises', 'https://pgexercises.com', 'en', 'Bài tập PostgreSQL'],
    ['practice', 'SQL Murder Mystery', 'https://mystery.knightlab.com', 'en', 'Học SQL qua trò chơi phá án'],
    ['tool', 'PostGIS', 'https://postgis.net', 'en', 'Cơ sở dữ liệu không gian'],
    ['tool', 'DuckDB', 'https://duckdb.org', 'en', 'SQL phân tích trên tệp, có phần mở rộng không gian']
  ]
};
S.cs_os = {
  vi: 'Hệ điều hành và kiến trúc máy tính', ru: 'Операционные системы и архитектура ЭВМ', en: 'Operating systems and computer architecture',
  tp: ['процессы и потоки', 'планирование', 'синхронизация', 'виртуальная память', 'файловые системы', 'кэш'], h: 5,
  qr: 'операционные системы лекции', qe: 'operating systems course',
  f: 'Tiến trình và luồng, lập lịch, đồng bộ (mutex, semaphore, deadlock), bộ nhớ ảo và phân trang, hệ thống tệp, bộ nhớ đệm CPU, kiến trúc von Neumann, lệnh Linux cơ bản.',
  r: [
    ['book', 'Таненбаум Э. Современные операционные системы', '', 'ru', 'Kinh điển'],
    ['book', 'Таненбаум Э. Архитектура компьютера', '', 'ru', 'Kiến trúc máy tính'],
    ['book', 'Bryant R., O’Hallaron D. Computer Systems: A Programmer’s Perspective', 'https://csapp.cs.cmu.edu', 'en', 'Trang sách CS:APP'],
    ['course', 'Nand2Tetris', 'https://www.nand2tetris.org', 'en', 'Tự xây máy tính từ cổng logic'],
    ['site', 'Linux Journey', 'https://linuxjourney.com', 'en', 'Học Linux từng bước']
  ]
};
S.cs_net = {
  vi: 'Mạng máy tính', ru: 'Компьютерные сети', en: 'Computer networks',
  tp: ['OSI и TCP/IP', 'TCP и UDP', 'DNS', 'HTTP и TLS', 'маршрутизация', 'NAT'], h: 5,
  qr: 'компьютерные сети курс', qe: 'computer networks course',
  f: 'Mô hình OSI và TCP/IP, TCP và UDP, bắt tay ba bước, DNS, HTTP, HTTPS và TLS, định tuyến IP, NAT, mạng con và CIDR, REST API, WebSocket.',
  r: [
    ['book', 'Олифер В. Г., Олифер Н. А. Компьютерные сети. Принципы, технологии, протоколы', '', 'ru', 'Giáo trình chuẩn của Nga'],
    ['book', 'Таненбаум Э. Компьютерные сети', '', 'ru', 'Kinh điển'],
    ['site', 'Kurose J., Ross K. Computer Networking: A Top-Down Approach (trang sách)', 'https://gaia.cs.umass.edu/kurose_ross/', 'en', 'Video, bài tập tương tác'],
    ['site', 'Cloudflare Learning Center', 'https://www.cloudflare.com/learning/', 'en', 'Giải thích ngắn về DNS, HTTP, bảo mật'],
    ['tool', 'Wireshark', 'https://www.wireshark.org', 'en', 'Phân tích gói tin']
  ]
};
S.cs_se = {
  vi: 'Thiết kế phần mềm, mẫu thiết kế, kiểm thử', ru: 'Основы проектирования ПО', en: 'Software engineering, patterns, testing',
  tp: ['SOLID', 'паттерны', 'тестирование', 'жизненный цикл разработки'], h: 5,
  qr: 'паттерны проектирования тестирование ПО', qe: 'software design patterns testing',
  f: 'SOLID, các mẫu hay hỏi (Singleton, Factory, Observer, Strategy, Adapter), kiểm thử đơn vị và tích hợp, TDD, review mã, Agile và Scrum, kiến trúc phân lớp.',
  r: [
    ['book', 'Мартин Р. Чистый код', '', 'ru', 'Bản dịch Clean Code'],
    ['book', 'Макконнелл С. Совершенный код', '', 'ru', 'Code Complete'],
    ['book', 'Гамма Э. и др. Паттерны объектно-ориентированного проектирования', '', 'ru', 'Sách của «bộ tứ»'],
    ['free', 'Software Engineering at Google', 'https://abseil.io/resources/swe-book', 'en', 'Đọc miễn phí'],
    ['site', 'The Twelve-Factor App (tiếng Nga)', 'https://12factor.net/ru/', 'ru', 'Nguyên tắc xây ứng dụng'],
    ['tool', 'pytest', 'https://docs.pytest.org', 'en', 'Kiểm thử trong Python']
  ]
};
S.cs_hpc = {
  vi: 'Tính toán hiệu năng cao, lập trình song song, GPU', ru: 'Высокопроизводительные вычисления и параллельное программирование', en: 'HPC, parallel programming, GPU',
  tp: ['MPI', 'OpenMP', 'CUDA', 'закон Амдала', 'векторизация'], h: 6,
  qr: 'параллельное программирование MPI OpenMP CUDA лекции', qe: 'parallel programming MPI OpenMP CUDA course',
  f: 'Định luật Amdahl và Gustafson, bộ nhớ chia sẻ và phân tán, MPI (send/recv, collective), OpenMP (parallel for, race condition), mô hình GPU (thread, block, warp, shared memory), vector hoá NumPy, Numba, Dask.',
  r: [
    ['book', 'Воеводин В. В., Воеводин Вл. В. Параллельные вычисления', '', 'ru', 'Kinh điển НИВЦ МГУ'],
    ['book', 'Антонов А. С. Параллельное программирование с использованием технологии MPI', '', 'ru', 'Giáo trình МГУ'],
    ['book', 'Kirk D., Hwu W. Programming Massively Parallel Processors', '', 'en', 'Sách chuẩn về CUDA'],
    ['site', 'AlgoWiki: открытая энциклопедия свойств алгоритмов', 'https://algowiki-project.org/ru/', 'ru', 'Tính song song của thuật toán'],
    ['site', 'NVIDIA CUDA C++ Programming Guide', 'https://docs.nvidia.com/cuda/cuda-c-programming-guide/', 'en', 'Tài liệu chính thức'],
    ['tool', 'Numba', 'https://numba.readthedocs.io', 'en', 'Biên dịch Python cho CPU và GPU'],
    ['tool', 'mpi4py', 'https://mpi4py.readthedocs.io', 'en', 'MPI trong Python']
  ]
};
S.cs_bigdata = {
  vi: 'Dữ liệu lớn', ru: 'Работа с большими данными', en: 'Big data',
  tp: ['MapReduce', 'Spark', 'Parquet', 'Kafka', 'data lake'], h: 5,
  qr: 'большие данные Spark Hadoop лекции', qe: 'big data spark course',
  f: 'MapReduce, Spark (RDD, DataFrame, lazy evaluation, partition), định dạng cột Parquet, xử lý luồng với Kafka, data lake và data warehouse, ETL và ELT.',
  r: [
    ['book', 'Уайт Т. Hadoop. Подробное руководство', '', 'ru', 'Bản dịch'],
    ['book', 'Chambers B., Zaharia M. Spark: The Definitive Guide', '', 'en', 'Sách chuẩn về Spark'],
    ['site', 'Apache Spark Documentation', 'https://spark.apache.org/docs/latest/', 'en', 'Tài liệu chính thức'],
    ['course', 'DataTalksClub: Data Engineering Zoomcamp', 'https://github.com/DataTalksClub/data-engineering-zoomcamp', 'en', 'Khoá miễn phí, có video'],
    ['tool', 'Apache Parquet', 'https://parquet.apache.org', 'en', 'Định dạng lưu trữ cột']
  ]
};
S.cs_sci_sw = {
  vi: 'Phát triển phần mềm khoa học, khả năng tái lập', ru: 'Разработка научных программных комплексов', en: 'Research software engineering',
  tp: ['структура проекта', 'окружения', 'версионирование данных', 'воспроизводимость', 'документация'], h: 4,
  qr: 'воспроизводимость научных вычислений', qe: 'research software engineering reproducibility',
  f: 'Cấu trúc dự án, môi trường (conda, venv, Docker), quản lý phiên bản dữ liệu (DVC), pipeline (Snakemake), kiểm thử khoa học, tài liệu hoá (Sphinx), gán DOI cho mã (Zenodo), giấy phép mã nguồn.',
  r: [
    ['paper', 'Wilson G. et al. Good enough practices in scientific computing (PLOS Comp. Biol., 2017)', 'https://doi.org/10.1371/journal.pcbi.1005510', 'en', 'Danh sách thực hành tối thiểu'],
    ['course', 'Software Carpentry: Lessons', 'https://software-carpentry.org/lessons/', 'en', 'Shell, Git, Python cho nhà khoa học'],
    ['tool', 'DVC', 'https://dvc.org', 'en', 'Phiên bản hoá dữ liệu và mô hình'],
    ['tool', 'Snakemake', 'https://snakemake.readthedocs.io', 'en', 'Quản lý pipeline'],
    ['tool', 'Zenodo', 'https://zenodo.org', 'en', 'Lưu trữ mã và dữ liệu có DOI'],
    ['tool', 'Cookiecutter Data Science', 'https://github.com/drivendataorg/cookiecutter-data-science', 'en', 'Mẫu cấu trúc dự án']
  ]
};
S.t_scipy = {
  vi: 'Python cho khoa học: NumPy, SciPy, pandas, Matplotlib', ru: 'Python для научных задач', en: 'Scientific Python',
  tp: ['NumPy', 'SciPy', 'pandas', 'Matplotlib', 'Jupyter'], h: 6, core: 1,
  qr: 'NumPy pandas Matplotlib курс', qe: 'numpy scipy pandas tutorial',
  f: 'Broadcasting và vector hoá, chỉ mục nâng cao, dtype và bộ nhớ, scipy.optimize, interpolate, ndimage, pandas groupby, merge, chuỗi thời gian, Matplotlib theo API hướng đối tượng.',
  r: [
    ['free', 'VanderPlas J. Python Data Science Handbook', 'https://jakevdp.github.io/PythonDataScienceHandbook/', 'en', 'Đọc miễn phí'],
    ['free', 'McKinney W. Python for Data Analysis, 3rd ed. (bản mở)', 'https://wesmckinney.com/book/', 'en', 'Sách của tác giả pandas'],
    ['site', 'NumPy Documentation', 'https://numpy.org/doc/stable/', 'en', 'Tài liệu chính thức'],
    ['site', 'SciPy Documentation', 'https://docs.scipy.org/doc/scipy/', 'en', 'Tài liệu chính thức'],
    ['site', 'pandas Documentation', 'https://pandas.pydata.org/docs/', 'en', 'Tài liệu chính thức'],
    ['practice', '100 NumPy exercises', 'https://github.com/rougier/numpy-100', 'en', 'Bài luyện NumPy'],
    ['tool', 'Google Colab', 'https://colab.research.google.com', 'en', 'Notebook miễn phí có GPU']
  ]
};
S.t_git = {
  vi: 'Git, Jupyter, Docker, CI/CD', ru: 'Системы контроля версий и воспроизводимость', en: 'Git, Docker, CI/CD',
  tp: ['Git', 'GitHub', 'Docker', 'CI/CD', 'Jupyter'], h: 4, core: 1,
  qr: 'Git Docker курс для начинающих', qe: 'git docker tutorial',
  f: 'commit, branch, merge, rebase, xử lý xung đột, pull request và review, .gitignore; Dockerfile, image và container; CI chạy kiểm thử tự động bằng GitHub Actions; notebook tái lập được.',
  r: [
    ['tool', 'Learn Git Branching (tiếng Nga)', 'https://learngitbranching.js.org/?locale=ru_RU', 'ru', 'Học nhánh Git bằng trò chơi'],
    ['tool', 'Oh My Git!', 'https://ohmygit.org', 'en', 'Trò chơi học Git'],
    ['site', 'Docker: Get started', 'https://docs.docker.com/get-started/', 'en', 'Hướng dẫn chính thức'],
    ['site', 'GitHub Actions Documentation', 'https://docs.github.com/en/actions', 'en', 'CI/CD trên GitHub'],
    ['course', 'GitHub Skills', 'https://skills.github.com', 'en', 'Khoá tương tác ngay trong GitHub'],
    ['tool', 'Project Jupyter', 'https://jupyter.org', 'en', 'Notebook và JupyterLab']
  ]
};
S.t_viz = {
  vi: 'Trực quan hoá dữ liệu', ru: 'Визуализация данных и результатов моделирования', en: 'Data visualization',
  tp: ['выбор графика', 'цветовые шкалы', 'графики для статей', '3D и растры'], h: 3,
  qr: 'визуализация данных matplotlib', qe: 'data visualization principles',
  f: 'Chọn loại biểu đồ hợp dữ liệu, bảng màu cảm nhận đều (viridis, Crameri; tránh jet và rainbow), biểu đồ cho bài báo (kích thước, font), trực quan dữ liệu raster và 3D.',
  r: [
    ['free', 'Wilke C. Fundamentals of Data Visualization', 'https://clauswilke.com/dataviz/', 'en', 'Đọc miễn phí'],
    ['book', 'Tufte E. The Visual Display of Quantitative Information', '', 'en', 'Kinh điển'],
    ['site', 'From Data to Viz', 'https://www.data-to-viz.com', 'en', 'Cây chọn loại biểu đồ'],
    ['tool', 'ColorBrewer', 'https://colorbrewer2.org', 'en', 'Bảng màu cho bản đồ'],
    ['tool', 'Scientific colour maps (F. Crameri)', 'https://www.fabiocrameri.ch/colourmaps/', 'en', 'Bảng màu khoa học'],
    ['site', 'Matplotlib Gallery', 'https://matplotlib.org/stable/gallery/', 'en', 'Mẫu biểu đồ có mã'],
    ['tool', 'ParaView', 'https://www.paraview.org', 'en', 'Trực quan dữ liệu mô phỏng 3D']
  ]
};
})(window.KTT_DATA.subjects);

(function (S) {
S.u_aero = {
  vi: 'Khí động học và động lực bay', ru: 'Основы аэродинамики и динамики полёта', en: 'Aerodynamics and flight dynamics',
  tp: ['подъёмная сила', 'сопротивление', 'число Рейнольдса', 'устойчивость', 'режимы полёта'], h: 4,
  qr: 'аэродинамика и динамика полёта лекции', qe: 'aerodynamics flight dynamics lecture',
  f: 'Lực nâng và lực cản, hệ số Cl và Cd, số Reynolds, góc tấn và thất tốc, ổn định dọc và ngang; khác biệt giữa multicopter (lực đẩy cánh quạt) và máy bay cánh bằng.',
  r: [
    ['book', 'Anderson J. Introduction to Flight', '', 'en', 'Nhập môn chuẩn'],
    ['book', 'Beard R., McLain T. Small Unmanned Aircraft: Theory and Practice', '', 'en', 'Sách chuẩn về UAV nhỏ, có mô hình và điều khiển'],
    ['site', 'NASA Glenn: Beginner’s Guide to Aeronautics', 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/', 'en', 'Giải thích từng khái niệm'],
    ['tool', 'XFLR5', 'http://www.xflr5.tech/xflr5.htm', 'en', 'Phân tích profin cánh, máy bay nhỏ']
  ]
};
S.u_design = {
  vi: 'Cấu tạo và bố trí UAV', ru: 'Конструкция и компоновка БПЛА', en: 'UAV design and layout',
  tp: ['мультикоптеры', 'самолётный тип', 'VTOL', 'силовая установка', 'полезная нагрузка'], h: 3,
  qr: 'устройство БПЛА конструкция', qe: 'drone design build components',
  f: 'Sơ đồ khung (quad, hexa, VTOL, cánh bằng), tỉ lệ lực đẩy trên khối lượng, chọn động cơ, ESC, cánh quạt, pin (C-rate, mAh, thời gian bay), trọng tâm, vật liệu, tải trọng.',
  r: [
    ['book', 'Austin R. Unmanned Aircraft Systems: UAVS Design, Development and Deployment', '', 'en', 'Tổng quan hệ thống UAV'],
    ['book', 'Афанасьев П. П., Голубев И. С. и др. Беспилотные летательные аппараты. Основы устройства и функционирования', '', 'ru', 'Giáo trình МАИ'],
    ['tool', 'eCalc', 'https://www.ecalc.ch', 'en', 'Tính lực đẩy, thời gian bay multicopter'],
    ['site', 'Oscar Liang: FPV drone guides', 'https://oscarliang.com', 'en', 'Hướng dẫn chọn linh kiện, lắp ráp']
  ]
};
S.u_control = {
  vi: 'Hệ điều khiển, PID, autopilot', ru: 'Системы управления и автопилоты', en: 'Control systems and autopilots',
  tp: ['передаточная функция', 'ПИД-регулятор', 'устойчивость', 'пространство состояний', 'каскадное управление'], h: 6, core: 1,
  qr: 'теория автоматического управления ПИД регулятор', qe: 'control systems PID lecture',
  f: 'Hàm truyền, phản hồi, PID và tác dụng của từng hệ số, ổn định (vị trí cực, Bode, Nyquist), mô hình không gian trạng thái, vòng điều khiển lồng nhau (tư thế bên trong, vị trí bên ngoài) trong autopilot, chỉnh tham số.',
  r: [
    ['book', 'Бесекерский В. А., Попов Е. П. Теория систем автоматического управления', '', 'ru', 'Giáo trình kinh điển'],
    ['book', 'Ogata K. Modern Control Engineering', '', 'en', 'Giáo trình chuẩn'],
    ['free', 'Åström K., Murray R. Feedback Systems', 'https://fbswiki.org', 'en', 'Sách mở về điều khiển phản hồi'],
    ['site', 'PX4: Controller Diagrams', 'https://docs.px4.io/main/en/flight_stack/controller_diagrams.html', 'en', 'Sơ đồ vòng điều khiển trong PX4']
  ]
};
S.u_sensors = {
  vi: 'Điện tử và cảm biến UAV', ru: 'Электроника и сенсорика', en: 'UAV electronics and sensors',
  tp: ['акселерометр', 'гироскоп', 'магнитометр', 'барометр', 'ГНСС', 'лидар', 'камеры'], h: 5, core: 1,
  qr: 'датчики БПЛА IMU ГНСС', qe: 'drone sensors IMU GNSS',
  f: 'IMU (gia tốc kế, con quay: bias, drift, nhiễu), từ kế và hiệu chuẩn, khí áp kế, GNSS (RTK, PPK), lidar và ToF, camera (màn trập cuộn hay toàn cục), đồng bộ thời gian, hợp nhất cảm biến.',
  r: [
    ['book', 'Groves P. Principles of GNSS, Inertial, and Multisensor Integrated Navigation Systems', '', 'en', 'Sách chuẩn về dẫn đường tích hợp'],
    ['site', 'VectorNav: Inertial Navigation Primer', 'https://www.vectornav.com/resources/inertial-navigation-primer', 'en', 'Nhập môn quán tính'],
    ['site', 'ESA Navipedia (GNSS)', 'https://gssc.esa.int/navipedia/', 'en', 'Bách khoa về GNSS']
  ]
};
S.u_telemetry = {
  vi: 'Đo xa và liên lạc', ru: 'Телеметрия и связь', en: 'Telemetry and datalinks',
  tp: ['MAVLink', 'радиоканал', 'бюджет радиолинии', 'видеоканал', 'помехоустойчивость'], h: 3,
  qr: 'телеметрия БПЛА MAVLink радиосвязь', qe: 'drone telemetry MAVLink radio link',
  f: 'Băng tần (433/868/915 MHz, 2,4/5,8 GHz), ngân sách đường truyền, suy hao không gian tự do, điều chế, các bản tin MAVLink (HEARTBEAT, GPS_RAW_INT), mã kênh, chống nhiễu, kênh video.',
  r: [
    ['book', 'Скляр Б. Цифровая связь. Теоретические основы и практическое применение', '', 'ru', 'Bản dịch của Sklar'],
    ['tool', 'QGroundControl', 'https://qgroundcontrol.com', 'en', 'Trạm mặt đất PX4 và ArduPilot'],
    ['tool', 'pymavlink', 'https://github.com/ArduPilot/pymavlink', 'en', 'MAVLink trong Python'],
    ['tool', 'ExpressLRS', 'https://www.expresslrs.org', 'en', 'Hệ điều khiển vô tuyến mã nguồn mở']
  ]
};
S.u_law = {
  vi: 'Pháp lý và an toàn bay', ru: 'Нормативно-правовая база и безопасность полётов', en: 'UAV regulations and flight safety',
  tp: ['Воздушный кодекс', 'использование воздушного пространства', 'учёт БВС', 'зоны ограничений', 'страхование'], h: 2, core: 1,
  qr: 'правила полётов беспилотников в России законодательство', qe: 'drone regulations ICAO EASA',
  f: 'Đăng ký và khai báo BVS, phân loại theo khối lượng, xin phép sử dụng vùng trời, vùng cấm và hạn chế, chụp ảnh từ trên không, bảo hiểm; nếu ứng tuyển ở Việt Nam, đối chiếu quy định của Việt Nam.',
  r: [
    ['site', 'ICAO: Unmanned Aircraft Systems', 'https://www.icao.int/safety/UA/Pages/default.aspx', 'en', 'Khung quốc tế'],
    ['site', 'EASA: Civil drones', 'https://www.easa.europa.eu/en/domains/civil-drones', 'en', 'Quy định châu Âu, phân loại theo rủi ro'],
    ['law', 'Воздушный кодекс Российской Федерации (tìm văn bản hiện hành)', 'https://www.google.com/search?q=%D0%92%D0%BE%D0%B7%D0%B4%D1%83%D1%88%D0%BD%D1%8B%D0%B9+%D0%BA%D0%BE%D0%B4%D0%B5%D0%BA%D1%81+%D0%A0%D0%A4+%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D1%83%D1%8E%D1%89%D0%B0%D1%8F+%D1%80%D0%B5%D0%B4%D0%B0%D0%BA%D1%86%D0%B8%D1%8F', 'ru', 'Liên kết tìm kiếm: luật thay đổi thường xuyên, hãy đọc bản đang có hiệu lực'],
    ['law', 'Федеральные правила использования воздушного пространства (tìm bản hiện hành)', 'https://www.google.com/search?q=%D0%A4%D0%B5%D0%B4%D0%B5%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5+%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0+%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F+%D0%B2%D0%BE%D0%B7%D0%B4%D1%83%D1%88%D0%BD%D0%BE%D0%B3%D0%BE+%D0%BF%D1%80%D0%BE%D1%81%D1%82%D1%80%D0%B0%D0%BD%D1%81%D1%82%D0%B2%D0%B0+%D0%91%D0%92%D0%A1', 'ru', 'Liên kết tìm kiếm']
  ]
};
S.u_embedded = {
  vi: 'Lập trình vi điều khiển và hệ nhúng', ru: 'Программирование микроконтроллеров и встраиваемых систем', en: 'Embedded programming',
  tp: ['GPIO', 'прерывания', 'таймеры и ШИМ', 'АЦП', 'UART/I2C/SPI', 'RTOS'], h: 5,
  qr: 'программирование STM32 микроконтроллеры уроки', qe: 'embedded systems STM32 course',
  f: 'GPIO, ngắt, timer và PWM, ADC, UART, I2C, SPI, CAN, DMA, RTOS (task, queue, mutex), từ khoá volatile, bộ nhớ hạn chế, gỡ lỗi qua JTAG/SWD.',
  r: [
    ['book', 'White E. Making Embedded Systems', '', 'en', 'Tư duy thiết kế hệ nhúng'],
    ['site', 'Arduino Documentation', 'https://docs.arduino.cc', 'en', 'Tài liệu chính thức'],
    ['site', 'STM32 MCU wiki (ST)', 'https://wiki.st.com/stm32mcu', 'en', 'Hướng dẫn của hãng'],
    ['site', 'FreeRTOS', 'https://www.freertos.org', 'en', 'Hệ điều hành thời gian thực'],
    ['tool', 'Wokwi', 'https://wokwi.com', 'en', 'Mô phỏng Arduino, ESP32, STM32 trên trình duyệt'],
    ['tool', 'PlatformIO', 'https://platformio.org', 'en', 'Môi trường phát triển nhúng']
  ]
};
S.u_robotics = {
  vi: 'Nhập môn robot học', ru: 'Введение в робототехнику', en: 'Introduction to robotics',
  tp: ['системы координат', 'матрицы поворота', 'кватернионы', 'кинематика', 'навигация'], h: 5,
  qr: 'робототехника лекции кинематика', qe: 'robotics lecture kinematics',
  f: 'Hệ toạ độ và phép quay (ma trận quay, góc Euler, quaternion, khoá gimbal), động học thuận và ngược, các khung NED, ENU, ECEF, mô hình chuyển động, cảm biến và ước lượng.',
  r: [
    ['book', 'Siciliano B. et al. Robotics: Modelling, Planning and Control', '', 'en', 'Giáo trình chuẩn'],
    ['book', 'Зенкевич С. Л., Ющенко А. С. Основы управления манипуляционными роботами', '', 'ru', 'Giáo trình МГТУ'],
    ['site', 'Modern Robotics (Lynch & Park): trang sách', 'https://hades.mech.northwestern.edu/index.php/Modern_Robotics', 'en', 'Sách miễn phí, video từng chương'],
    ['site', 'PythonRobotics (A. Sakai)', 'https://github.com/AtsushiSakai/PythonRobotics', 'en', 'Mã mẫu cho định vị, lập bản đồ, lập kế hoạch']
  ]
};
S.u_advcontrol = {
  vi: 'Điều khiển phi tuyến, bền vững, thích nghi; điều khiển bầy', ru: 'Продвинутая динамика и управление БПЛА', en: 'Advanced control, swarms',
  tp: ['функции Ляпунова', 'скользящие режимы', 'адаптивное управление', 'LQR и MPC', 'управление роем'], h: 5,
  qr: 'нелинейное робастное адаптивное управление лекции', qe: 'nonlinear robust adaptive control MPC lecture',
  f: 'Hàm Lyapunov, tuyến tính hoá phản hồi, sliding mode, điều khiển thích nghi, LQR và MPC, H∞, điều khiển đội hình và bầy (đồng thuận), mô hình hoá bất định.',
  r: [
    ['book', 'Халил Х. Нелинейные системы', '', 'ru', 'Bản dịch của Khalil'],
    ['book', 'Мирошник И. В., Никифоров В. О., Фрадков А. Л. Нелинейное и адаптивное управление сложными динамическими системами', '', 'ru', 'Trường phái ИТМО'],
    ['book', 'Slotine J.-J., Li W. Applied Nonlinear Control', '', 'en', 'Kinh điển'],
    ['course', 'Underactuated Robotics (R. Tedrake, MIT)', 'https://underactuated.csail.mit.edu', 'en', 'Sách và bài giảng mở'],
    ['tool', 'CasADi', 'https://web.casadi.org', 'en', 'Tối ưu và MPC'],
    ['tool', 'Bitcraze Crazyflie', 'https://www.bitcraze.io', 'en', 'Drone nhỏ cho nghiên cứu bầy']
  ]
};
S.u_nav = {
  vi: 'Dẫn đường: SLAM, GNSS/INS, lọc Kalman', ru: 'Навигация и ориентация', en: 'Navigation: SLAM, GNSS/INS, Kalman filter',
  tp: ['фильтр Калмана', 'EKF/UKF', 'интеграция ГНСС/ИНС', 'SLAM', 'визуальная одометрия', 'RTK'], h: 7, core: 1,
  qr: 'фильтр Калмана SLAM навигация лекции', qe: 'Kalman filter SLAM lecture',
  f: 'Bộ lọc Kalman, EKF, UKF, bộ lọc hạt; tích hợp GNSS/INS (lỏng, chặt); SLAM (front-end, back-end, đóng vòng, bundle adjustment); odometry thị giác; RTK và PPK; nhiễu đa đường.',
  r: [
    ['book', 'Thrun S., Burgard W., Fox D. Probabilistic Robotics', '', 'en', 'Kinh điển về ước lượng trong robot'],
    ['book', 'Barfoot T. State Estimation for Robotics', '', 'en', 'Ước lượng trạng thái hiện đại'],
    ['site', 'KalmanFilter.NET (bản tiếng Việt)', 'https://kalmanfilter.net/VI/default_vi.aspx', 'vi', 'Lọc Kalman qua ví dụ, có tiếng Việt'],
    ['free', 'Labbe R. Kalman and Bayesian Filters in Python', 'https://github.com/rlabbe/Kalman-and-Bayesian-Filters-in-Python', 'en', 'Sách dạng notebook'],
    ['tool', 'ORB-SLAM3', 'https://github.com/UZ-SLAMLab/ORB_SLAM3', 'en', 'SLAM thị giác'],
    ['tool', 'GTSAM', 'https://gtsam.org', 'en', 'Đồ thị nhân tử cho SLAM'],
    ['tool', 'RTKLIB', 'https://www.rtklib.com', 'en', 'Xử lý GNSS RTK, PPK']
  ]
};
S.u_mission = {
  vi: 'Lập kế hoạch nhiệm vụ và quỹ đạo bay', ru: 'Планирование миссий и маршрутов', en: 'Mission and path planning',
  tp: ['A*', 'RRT', 'оптимизация траекторий', 'облёт препятствий', 'мультиагентные задачи'], h: 4,
  qr: 'планирование траектории A* RRT', qe: 'path planning A* RRT drone',
  f: 'A*, Dijkstra, RRT và RRT*, PRM, trường thế, tối ưu quỹ đạo (minimum snap); lập kế hoạch bay chụp: độ chồng phủ 70–80%, GSD, độ cao bay; bài toán người du lịch và VRP cho nhiều UAV.',
  r: [
    ['free', 'LaValle S. Planning Algorithms', 'http://lavalle.pl/planning/', 'en', 'Sách mở'],
    ['tool', 'OMPL (Open Motion Planning Library)', 'https://ompl.kavrakilab.org', 'en', 'Thư viện lập kế hoạch'],
    ['tool', 'Mission Planner', 'https://ardupilot.org/planner/', 'en', 'Lập nhiệm vụ cho ArduPilot']
  ]
};
S.u_sim = {
  vi: 'Mô phỏng và kiểm thử ảo', ru: 'Симуляторы и тестирование в виртуальной среде', en: 'Simulation (Gazebo, SITL, ROS)',
  tp: ['SITL', 'HITL', 'Gazebo', 'ROS 2', 'синтетические данные'], h: 4,
  qr: 'симулятор Gazebo SITL PX4 ArduPilot', qe: 'Gazebo SITL PX4 simulation tutorial',
  f: 'SITL và HITL, ghép PX4/ArduPilot với Gazebo và ROS 2, mô hình cảm biến và nhiễu, sinh dữ liệu tổng hợp cho thị giác máy tính, kiểm thử tình huống lỗi.',
  r: [
    ['site', 'PX4: Simulation', 'https://docs.px4.io/main/en/simulation/', 'en', 'Các trình mô phỏng được hỗ trợ'],
    ['tool', 'Webots', 'https://cyberbotics.com', 'en', 'Mô phỏng robot mã nguồn mở'],
    ['tool', 'Microsoft AirSim (lưu trữ)', 'https://github.com/microsoft/AirSim', 'en', 'Mô phỏng ảnh chân thực; dự án đã ngừng phát triển'],
    ['tool', 'FlightGear', 'https://www.flightgear.org', 'en', 'Mô phỏng bay']
  ]
};
S.u_payload = {
  vi: 'Tải trọng và tích hợp hệ thống', ru: 'Полезная нагрузка и интеграция систем', en: 'Payloads and integration',
  tp: ['мультиспектральные камеры', 'тепловизоры', 'лидары', 'гиростабилизация', 'синхронизация данных'], h: 4, core: 1,
  qr: 'мультиспектральная съёмка с БПЛА тепловизор лидар', qe: 'drone multispectral thermal lidar payload',
  f: 'Camera RGB, đa phổ, nhiệt, lidar: trường nhìn, GSD, độ phân giải bức xạ; hiệu chuẩn bức xạ bằng tấm phản xạ chuẩn; gimbal; đồng bộ GNSS–IMU–camera; khối lượng và điện năng.',
  r: [
    ['tool', 'MicaSense: image processing tutorials', 'https://github.com/micasense/imageprocessing', 'en', 'Hiệu chuẩn bức xạ ảnh đa phổ UAV']
  ]
};
S.u_security = {
  vi: 'An ninh mạng cho hệ UAV', ru: 'Безопасность и киберзащита БАС', en: 'UAS cybersecurity',
  tp: ['подавление и спуфинг ГНСС', 'защита каналов связи', 'отказоустойчивость', 'Remote ID'], h: 3,
  qr: 'спуфинг ГНСС защита беспилотников', qe: 'GNSS spoofing drone cybersecurity',
  f: 'Mối đe doạ: gây nhiễu và giả mạo GNSS, chiếm quyền kênh MAVLink không mã hoá, lỗ hổng firmware; biện pháp: ký bản tin MAVLink 2, phát hiện spoofing bằng đối chiếu IMU và thị giác, chế độ failsafe, Remote ID.',
  r: [
    ['site', 'Google Scholar: tổng quan về phát hiện giả mạo GNSS cho UAV', 'https://scholar.google.com/scholar?q=GNSS+spoofing+detection+UAV+survey', 'en', 'Liên kết tìm bài tổng quan trên Google Scholar']
  ]
};
S.t_ros = {
  vi: 'ROS / ROS 2', ru: 'ROS (Robot Operating System)', en: 'ROS 2',
  tp: ['узлы', 'топики', 'сервисы', 'tf2', 'launch', 'rosbag'], h: 5,
  qr: 'ROS 2 уроки на русском', qe: 'ROS 2 tutorial',
  f: 'Node, topic, service, action, tf2, launch, rosbag, QoS (DDS); MAVROS và px4_ros_com để nối với autopilot.',
  r: [
    ['book', 'Joseph L. Mastering ROS for Robotics Programming', '', 'en', 'Thực hành'],
    ['site', 'ROS Discourse', 'https://discourse.ros.org', 'en', 'Diễn đàn cộng đồng']
  ]
};
S.t_px4 = {
  vi: 'PX4, ArduPilot, Jetson, STM32', ru: 'Аппаратные платформы (PX4/ArduPilot, Jetson, STM32)', en: 'PX4, ArduPilot, Jetson',
  tp: ['прошивка', 'калибровка', 'параметры', 'логи полётов', 'бортовой компьютер'], h: 4,
  qr: 'PX4 ArduPilot настройка', qe: 'PX4 ArduPilot setup tutorial',
  f: 'Kiến trúc PX4 (uORB, module), ArduPilot (mode, tham số), nạp firmware và hiệu chuẩn, phân tích log bay, máy tính đồng hành Jetson chạy mô hình tại biên.',
  r: [
    ['site', 'ArduPilot Documentation', 'https://ardupilot.org', 'en', 'Copter, Plane, Rover, Dev'],
    ['tool', 'PX4 Flight Review', 'https://review.px4.io', 'en', 'Phân tích log bay PX4'],
    ['site', 'NVIDIA Jetson AI Lab', 'https://www.jetson-ai-lab.com', 'en', 'Hướng dẫn chạy AI trên Jetson']
  ]
};
S.cv_dip = {
  vi: 'Xử lý ảnh số', ru: 'Цифровая обработка изображений', en: 'Digital image processing',
  tp: ['гистограммы', 'фильтрация', 'преобразование Фурье', 'морфология', 'сегментация', 'цветовые пространства'], h: 6, core: 1,
  qr: 'цифровая обработка изображений лекции', qe: 'digital image processing lecture',
  f: 'Histogram và cân bằng histogram, lọc tuyến tính (Gauss, Sobel) và trung vị, Fourier 2D, hình thái học (giãn, co, mở, đóng), dò biên Canny, ngưỡng Otsu, phân đoạn watershed, không gian màu.',
  r: [
    ['book', 'Гонсалес Р., Вудс Р. Цифровая обработка изображений', '', 'ru', 'Kinh điển, bản dịch'],
    ['book', 'Прэтт У. Цифровая обработка изображений', '', 'ru', 'Kinh điển'],
    ['book', 'Шапиро Л., Стокман Дж. Компьютерное зрение', '', 'ru', 'Bản dịch'],
    ['site', 'HIPR2: Image Processing Learning Resources', 'https://homepages.inf.ed.ac.uk/rbf/HIPR2/', 'en', 'Tra cứu toán tử xử lý ảnh'],
    ['tool', 'scikit-image', 'https://scikit-image.org', 'en', 'Xử lý ảnh trong Python']
  ]
};
S.cv_intro = {
  vi: 'Thị giác máy tính nhập môn', ru: 'Компьютерное зрение (вводный курс)', en: 'Computer vision fundamentals',
  tp: ['модель камеры', 'калибровка', 'особые точки', 'гомография', 'RANSAC', 'эпиполярная геометрия'], h: 7, core: 1,
  qr: 'компьютерное зрение лекции Конушин', qe: 'computer vision lecture',
  f: 'Mô hình camera lỗ kim, tham số trong và ngoài, hiệu chỉnh méo, homography và RANSAC, điểm đặc trưng (Harris, SIFT, ORB), so khớp ảnh, hình học epipolar (ma trận cơ bản và ma trận thiết yếu), optical flow.',
  r: [
    ['free', 'Szeliski R. Computer Vision: Algorithms and Applications, 2nd ed.', 'https://szeliski.org/Book/', 'en', 'Tác giả cho tải miễn phí'],
    ['book', 'Форсайт Д., Понс Ж. Компьютерное зрение. Современный подход', '', 'ru', 'Bản dịch'],
    ['book', 'Hartley R., Zisserman A. Multiple View Geometry in Computer Vision', '', 'en', 'Kinh điển hình học nhiều ảnh'],
    ['notes', 'Stanford CS231n: course notes', 'https://cs231n.github.io', 'en', 'Ghi chú bài giảng']
  ]
};
S.cv_dl = {
  vi: 'Học sâu cho thị giác máy tính', ru: 'Глубокое обучение для компьютерного зрения', en: 'Deep learning for computer vision',
  tp: ['свёрточные сети', 'детекция', 'сегментация', 'трекинг', 'ViT', 'аугментация'], h: 13, core: 1,
  qr: 'глубокое обучение компьютерное зрение детекция сегментация', qe: 'deep learning computer vision detection segmentation',
  f: 'CNN (tích chập, pooling, trường tiếp nhận), ResNet, U-Net; phát hiện một giai đoạn và hai giai đoạn (YOLO và Faster R-CNN), NMS, mAP, IoU; phân đoạn ngữ nghĩa, thể hiện, toàn cảnh; ViT; theo vết (SORT, ByteTrack); tăng cường dữ liệu, mất cân bằng lớp.',
  r: [
    ['free', 'Zhang A. et al. Dive into Deep Learning', 'https://d2l.ai', 'en', 'Sách mở có mã PyTorch'],
    ['site', 'CVF Open Access (CVPR, ICCV, ECCV)', 'https://openaccess.thecvf.com', 'en', 'Bài báo hội nghị thị giác máy tính'],
    ['tool', 'Ultralytics YOLO Docs', 'https://docs.ultralytics.com', 'en', 'Phát hiện, phân đoạn, theo vết'],
    ['tool', 'Detectron2', 'https://github.com/facebookresearch/detectron2', 'en', 'Phát hiện và phân đoạn'],
    ['tool', 'segmentation_models.pytorch', 'https://github.com/qubvel/segmentation_models.pytorch', 'en', 'U-Net, DeepLab sẵn dùng'],
    ['tool', 'TorchGeo', 'https://torchgeo.readthedocs.io', 'en', 'Học sâu cho ảnh viễn thám'],
    ['tool', 'CVAT', 'https://www.cvat.ai', 'en', 'Gán nhãn ảnh và video'],
    ['tool', 'Label Studio', 'https://labelstud.io', 'en', 'Gán nhãn dữ liệu']
  ]
};
S.cv_3d = {
  vi: 'Dựng 3D và quang trắc', ru: '3D-реконструкция и фотограмметрия', en: '3D reconstruction and photogrammetry',
  tp: ['SfM', 'MVS', 'уравнивание связок', 'облака точек', 'ЦМР и ЦММ', 'ортофотоплан'], h: 7, core: 1,
  qr: 'фотограмметрия structure from motion облако точек', qe: 'structure from motion photogrammetry lecture',
  f: 'Hình học nhiều ảnh, SfM tăng dần, bundle adjustment, MVS và đám mây điểm dày đặc, DSM, DTM, DEM, ảnh trực giao, điểm khống chế và RMSE; xu hướng mới: NeRF, 3D Gaussian Splatting.',
  r: [
    ['book', 'Михайлов А. П., Чибуничев А. Г. Фотограмметрия', '', 'ru', 'Giáo trình МИИГАиК'],
    ['book', 'Лобанов А. Н. Фотограмметрия', '', 'ru', 'Kinh điển'],
    ['book', 'Luhmann T. et al. Close-Range Photogrammetry and 3D Imaging', '', 'en', 'Quang trắc tầm gần'],
    ['tool', 'OpenDroneMap / WebODM', 'https://www.opendronemap.org', 'en', 'Xử lý ảnh UAV mã nguồn mở'],
    ['tool', 'Meshroom (AliceVision)', 'https://alicevision.org', 'en', 'Dựng 3D mã nguồn mở'],
    ['tool', 'CloudCompare', 'https://www.cloudcompare.org', 'en', 'Xử lý đám mây điểm'],
    ['tool', 'Open3D', 'https://www.open3d.org', 'en', 'Đám mây điểm trong Python'],
    ['tool', 'nerfstudio', 'https://docs.nerf.studio', 'en', 'NeRF và Gaussian Splatting']
  ]
};
S.cv_video = {
  vi: 'Phân tích luồng video thời gian thực', ru: 'Анализ видеопотока в реальном времени', en: 'Real-time video analytics',
  tp: ['задержка', 'пропускная способность', 'потоковая обработка', 'многообъектный трекинг', 'RTSP'], h: 4,
  qr: 'анализ видеопотока в реальном времени', qe: 'real-time video analytics pipeline',
  f: 'Chuỗi xử lý: giải mã, tiền xử lý, suy luận, hậu xử lý, mã hoá và truyền; độ trễ và thông lượng, batch, FPS; theo vết nhiều đối tượng; RTSP, WebRTC; xử lý trên Jetson.',
  r: [
    ['tool', 'FFmpeg', 'https://ffmpeg.org', 'en', 'Mã hoá, giải mã, truyền video'],
    ['tool', 'GStreamer', 'https://gstreamer.freedesktop.org', 'en', 'Pipeline đa phương tiện'],
    ['tool', 'NVIDIA DeepStream SDK', 'https://developer.nvidia.com/deepstream-sdk', 'en', 'Phân tích video trên GPU'],
    ['tool', 'ByteTrack', 'https://github.com/ifzhang/ByteTrack', 'en', 'Theo vết nhiều đối tượng']
  ]
};
S.t_photogram_sw = {
  vi: 'Phần mềm quang trắc: Metashape, Pix4D, WebODM', ru: 'Фотограмметрические пакеты', en: 'Photogrammetry software',
  tp: ['Agisoft Metashape', 'Pix4D', 'WebODM', 'PHOTOMOD', 'опорные точки'], h: 5, core: 1,
  qr: 'Agisoft Metashape уроки ортофотоплан', qe: 'Agisoft Metashape tutorial orthomosaic',
  f: 'Quy trình: kiểm tra ảnh, căn chỉnh, đặt điểm khống chế, đám mây điểm dày, lưới hoặc DEM, ảnh trực giao; đọc báo cáo chất lượng, độ chồng phủ, xử lý vùng nước và thực vật.',
  r: [
    ['site', 'Agisoft: User Manuals', 'https://www.agisoft.com/downloads/user-manuals/', 'en', 'Hướng dẫn chính thức, có bản tiếng Nga'],
    ['site', 'Pix4D Support', 'https://support.pix4d.com', 'en', 'Tài liệu Pix4D'],
    ['site', 'Ракурс: PHOTOMOD', 'https://racurs.ru', 'ru', 'Phần mềm quang trắc của Nga']
  ]
};
})(window.KTT_DATA.subjects);

(function (S) {
S.ai_ml = {
  vi: 'Học máy (cổ điển)', ru: 'Машинное обучение', en: 'Machine learning',
  tp: ['линейные модели', 'деревья и ансамбли', 'бустинг', 'SVM', 'кластеризация', 'метрики', 'кросс-валидация'], h: 13, core: 1,
  qr: 'машинное обучение лекции Воронцов', qe: 'machine learning course lectures',
  f: 'Bias–variance, quá khớp và chính quy hoá L1/L2, kiểm định chéo, chỉ số (accuracy, precision, recall, F1, ROC-AUC, kappa), cây quyết định, Random Forest và Gradient Boosting, SVM và hàm nhân, k-means, DBSCAN, PCA, rò rỉ dữ liệu; với dữ liệu không gian: tự tương quan không gian khi chia tập train/test.',
  r: [
    ['book', 'Жерон О. Прикладное машинное обучение с помощью Scikit-Learn, Keras и TensorFlow', '', 'ru', 'Thực hành, bản dịch'],
    ['book', 'Флах П. Машинное обучение. Наука и искусство построения алгоритмов', '', 'ru', 'Lý thuyết dễ hiểu'],
    ['notes', 'Учебник по машинному обучению (ШАД Яндекса)', 'https://contest.yandex.ru/tracks/ml/', 'ru', 'Giáo trình ML tiếng Nga tốt nhất hiện nay'],
    ['free', 'Hastie, Tibshirani, Friedman. The Elements of Statistical Learning', 'https://hastie.su.domains/ElemStatLearn/', 'en', 'Tác giả cho tải miễn phí'],
    ['free', 'Bishop C. Pattern Recognition and Machine Learning', 'https://www.microsoft.com/en-us/research/people/cmbishop/prml-book/', 'en', 'Bản PDF miễn phí từ Microsoft Research'],
    ['free', 'Murphy K. Probabilistic Machine Learning', 'https://probml.github.io/pml-book/', 'en', 'Bản nháp miễn phí'],
    ['site', 'MachineLearning.ru', 'http://www.machinelearning.ru', 'ru', 'Wiki tiếng Nga, có bài giảng Воронцов'],
    ['course', 'Coursera: Machine Learning Specialization (Andrew Ng)', 'https://www.coursera.org/specializations/machine-learning-introduction', 'en', 'Học miễn phí ở chế độ dự thính'],
    ['site', 'scikit-learn User Guide', 'https://scikit-learn.org/stable/user_guide.html', 'en', 'Tài liệu chính thức'],
    ['tool', 'CatBoost (Яндекс)', 'https://catboost.ai', 'en', 'Gradient boosting'],
    ['tool', 'XGBoost', 'https://xgboost.readthedocs.io', 'en', 'Gradient boosting'],
    ['practice', 'Kaggle Learn', 'https://www.kaggle.com/learn', 'en', 'Bài học ngắn có notebook'],
    ['site', 'Open Data Science (ODS)', 'https://ods.ai', 'ru', 'Cộng đồng ML lớn nhất nói tiếng Nga, có khoá học']
  ]
};
S.ai_data = {
  vi: 'Làm việc với dữ liệu: SQL, pandas, ETL, làm sạch', ru: 'Базы данных и основы работы с данными', en: 'Data wrangling and ETL',
  tp: ['SQL', 'pandas', 'ETL', 'очистка данных', 'feature engineering'], h: 5, core: 1,
  qr: 'анализ данных pandas предобработка', qe: 'data cleaning pandas ETL tutorial',
  f: 'Giá trị thiếu, ngoại lai, trùng lặp; chuẩn hoá và co giãn, mã hoá biến phân loại, tạo đặc trưng, nối bảng, chuỗi thời gian (resample), ETL và kiểm tra chất lượng dữ liệu, truy vấn phân tích bằng SQL.',
  r: [
    ['free', 'McKinney W. Python for Data Analysis, 3rd ed.', 'https://wesmckinney.com/book/', 'en', 'Sách mở của tác giả pandas'],
    ['tool', 'Polars', 'https://pola.rs', 'en', 'DataFrame nhanh'],
    ['tool', 'OpenRefine', 'https://openrefine.org', 'en', 'Làm sạch dữ liệu bảng']
  ]
};
S.ai_dl = {
  vi: 'Học sâu', ru: 'Глубокое обучение', en: 'Deep learning',
  tp: ['обратное распространение', 'оптимизаторы', 'регуляризация', 'CNN', 'RNN', 'трансформеры', 'transfer learning'], h: 13, core: 1,
  qr: 'глубокое обучение лекции нейронные сети', qe: 'deep learning course lectures',
  f: 'Lan truyền ngược, hàm kích hoạt, khởi tạo, BatchNorm, Dropout, SGD và Adam, lịch learning rate, CNN, RNN và LSTM, attention và Transformer, học chuyển giao, tự giám sát, mô hình nền cho ảnh vệ tinh (Prithvi, SatMAE).',
  r: [
    ['book', 'Николенко С., Кадурин А., Архангельская Е. Глубокое обучение. Погружение в мир нейронных сетей', '', 'ru', 'Sách tiếng Nga tốt'],
    ['free', 'Goodfellow I., Bengio Y., Courville A. Deep Learning', 'https://www.deeplearningbook.org', 'en', 'Đọc miễn phí'],
    ['free', 'Prince S. Understanding Deep Learning', 'https://udlbook.github.io/udlbook/', 'en', 'Sách mới, hình minh hoạ rất tốt'],
    ['free', 'Bishop C., Bishop H. Deep Learning: Foundations and Concepts', 'https://www.bishopbook.com', 'en', 'Đọc trực tuyến'],
    ['free', 'Dive into Deep Learning', 'https://d2l.ai', 'en', 'Có mã chạy được'],
    ['course', 'Karpathy A. Neural Networks: Zero to Hero', 'https://karpathy.ai/zero-to-hero.html', 'en', 'Tự viết mạng nơ-ron từ đầu'],
    ['course', 'MIT 6.S191 Introduction to Deep Learning', 'http://introtodeeplearning.com', 'en', 'Bài giảng ngắn, cập nhật hằng năm'],
    ['course', 'fast.ai: Practical Deep Learning for Coders', 'https://course.fast.ai', 'en', 'Thực hành trước, lý thuyết sau'],
    ['course', 'Coursera: Deep Learning Specialization', 'https://www.coursera.org/specializations/deep-learning', 'en', 'Andrew Ng'],
    ['site', 'Alammar J. The Illustrated Transformer', 'https://jalammar.github.io/illustrated-transformer/', 'en', 'Giải thích Transformer bằng hình'],
    ['site', 'PyTorch Tutorials', 'https://pytorch.org/tutorials/', 'en', 'Hướng dẫn chính thức'],
    ['course', 'Hugging Face Learn', 'https://huggingface.co/learn', 'en', 'Các khoá LLM, CV, RL, Agents']
  ]
};
S.ai_rl = {
  vi: 'Học tăng cường và mô hình đa phương thức', ru: 'Обучение с подкреплением и мультимодальные модели', en: 'Reinforcement learning, multimodal models',
  tp: ['MDP', 'уравнение Беллмана', 'Q-learning', 'policy gradient', 'PPO', 'CLIP'], h: 5,
  qr: 'обучение с подкреплением лекции', qe: 'reinforcement learning course',
  f: 'MDP, phương trình Bellman, Q-learning, policy gradient, actor–critic, PPO, khám phá và khai thác; mô hình đa phương thức (CLIP, ảnh và văn bản); ứng dụng: UAV tự hành, lập lịch chụp vệ tinh.',
  r: [
    ['free', 'Sutton R., Barto A. Reinforcement Learning: An Introduction, 2nd ed.', 'http://incompleteideas.net/book/the-book-2nd.html', 'en', 'Tác giả cho đọc miễn phí'],
    ['tool', 'Gymnasium', 'https://gymnasium.farama.org', 'en', 'Môi trường RL'],
    ['tool', 'Stable-Baselines3', 'https://stable-baselines3.readthedocs.io', 'en', 'Thuật toán RL sẵn dùng']
  ]
};
S.ai_deploy = {
  vi: 'Tối ưu và triển khai mô hình (ONNX, TensorRT, Jetson)', ru: 'Оптимизация и развертывание моделей', en: 'Model optimization and deployment',
  tp: ['квантование', 'прунинг', 'дистилляция', 'ONNX', 'TensorRT', 'MLOps'], h: 6, core: 1,
  qr: 'квантование нейросетей ONNX TensorRT развертывание', qe: 'model quantization ONNX TensorRT deployment',
  f: 'Lượng tử hoá INT8 (PTQ và QAT), cắt tỉa, chưng cất tri thức, xuất ONNX, TensorRT, OpenVINO, đo độ trễ và thông lượng, phục vụ mô hình qua REST hoặc gRPC; MLOps: theo dõi thí nghiệm, trôi dữ liệu, CI/CD cho ML.',
  r: [
    ['book', 'Хьюен Ч. Проектирование систем машинного обучения', '', 'ru', 'Bản dịch Designing Machine Learning Systems'],
    ['site', 'ONNX', 'https://onnx.ai', 'en', 'Định dạng trao đổi mô hình'],
    ['site', 'ONNX Runtime', 'https://onnxruntime.ai', 'en', 'Suy luận đa nền tảng'],
    ['site', 'NVIDIA TensorRT Documentation', 'https://docs.nvidia.com/deeplearning/tensorrt/', 'en', 'Tối ưu suy luận trên GPU'],
    ['site', 'OpenVINO Documentation', 'https://docs.openvino.ai', 'en', 'Suy luận trên CPU Intel'],
    ['site', 'NVIDIA Jetson AI Lab', 'https://www.jetson-ai-lab.com', 'en', 'Mô hình trên thiết bị biên'],
    ['course', 'Made With ML (G. Mohandas)', 'https://madewithml.com', 'en', 'MLOps từ đầu đến cuối'],
    ['course', 'Full Stack Deep Learning', 'https://fullstackdeeplearning.com', 'en', 'Đưa mô hình vào sản phẩm'],
    ['tool', 'FastAPI', 'https://fastapi.tiangolo.com', 'en', 'Dựng API phục vụ mô hình'],
    ['tool', 'MLflow', 'https://mlflow.org', 'en', 'Theo dõi thí nghiệm, đăng ký mô hình']
  ]
};
S.ai_ts = {
  vi: 'Chuỗi thời gian và phát hiện biến động từ ảnh vệ tinh', ru: 'Анализ временных рядов и спутниковых временных серий', en: 'Time series and satellite change detection',
  tp: ['стационарность', 'ARIMA', 'сезонность', 'LSTM/TCN', 'детектирование изменений', 'LandTrendr', 'CCDC', 'BFAST'], h: 7, core: 1,
  qr: 'анализ временных рядов детектирование изменений спутниковые снимки', qe: 'satellite time series change detection',
  f: 'Tính dừng, ACF và PACF, ARIMA và SARIMA, phân rã mùa vụ, LSTM, TCN, Transformer cho chuỗi thời gian; phát hiện biến động: so sánh sau phân loại, CVA, LandTrendr, CCDC, BFAST; xử lý mây và khoảng trống dữ liệu.',
  r: [
    ['book', 'Бокс Дж., Дженкинс Г. Анализ временных рядов. Прогноз и управление', '', 'ru', 'Kinh điển'],
    ['site', 'LandTrendr on Google Earth Engine (eMapR)', 'https://emapr.github.io/LT-GEE/', 'en', 'Hướng dẫn phát hiện biến động theo thời gian'],
    ['tool', 'sktime', 'https://www.sktime.net', 'en', 'Học máy cho chuỗi thời gian'],
    ['data', 'Dynamic World', 'https://dynamicworld.app', 'en', 'Lớp phủ gần thời gian thực 10 m'],
    ['data', 'ESA WorldCover', 'https://esa-worldcover.org', 'en', 'Bản đồ lớp phủ toàn cầu 10 m']
  ]
};
S.ai_xai = {
  vi: 'Độ bất định và khả năng giải thích mô hình', ru: 'Методы неопределённости и интерпретируемость моделей', en: 'Uncertainty and explainable AI',
  tp: ['важность признаков', 'SHAP', 'LIME', 'Grad-CAM', 'калибровка', 'конформное прогнозирование'], h: 4,
  qr: 'интерпретируемость моделей SHAP', qe: 'explainable AI SHAP uncertainty',
  f: 'Độ quan trọng đặc trưng (hoán vị), SHAP và LIME, Grad-CAM cho CNN, bất định aleatoric và epistemic, MC Dropout, ensemble, dự đoán conformal, hiệu chỉnh xác suất.',
  r: [
    ['paper', 'Angelopoulos A., Bates S. A Gentle Introduction to Conformal Prediction (arXiv:2107.07511)', 'https://arxiv.org/abs/2107.07511', 'en', 'Nhập môn dự đoán conformal'],
    ['tool', 'Captum (PyTorch)', 'https://captum.ai', 'en', 'Giải thích mô hình PyTorch'],
    ['tool', 'MAPIE', 'https://mapie.readthedocs.io', 'en', 'Khoảng dự đoán conformal']
  ]
};
S.s_intro = {
  vi: 'Nhập môn kỹ thuật hàng không vũ trụ: cấu tạo vệ tinh', ru: 'Введение в аэрокосмическую технику', en: 'Spacecraft subsystems',
  tp: ['конструкция', 'СЭС', 'СТР', 'СОС', 'ДУ', 'бортовой комплекс управления', 'полезная нагрузка'], h: 4, core: 1,
  qr: 'устройство космического аппарата подсистемы лекции', qe: 'spacecraft subsystems introduction',
  f: 'Các phân hệ: kết cấu, nhiệt, nguồn (pin mặt trời, ắc quy), ADCS, động cơ, liên lạc TT&C, máy tính trên khoang, tải trọng; quỹ đạo LEO, MEO, GEO, đồng bộ mặt trời; ví dụ Sentinel-2, Landsat 9, Канопус-В, Ресурс-П.',
  r: [
    ['book', 'Fortescue P., Swinerd G., Stark J. Spacecraft Systems Engineering', '', 'en', 'Giáo trình chuẩn'],
    ['book', 'Wertz J., Larson W. Space Mission Analysis and Design (SMAD)', '', 'en', 'Sổ tay thiết kế nhiệm vụ'],
    ['site', 'NASA: Basics of Space Flight', 'https://science.nasa.gov/learn/basics-of-space-flight/', 'en', 'Nhập môn của JPL'],
    ['site', 'eoPortal: Satellite Missions', 'https://www.eoportal.org', 'en', 'Mô tả chi tiết các vệ tinh quan sát Trái Đất'],
    ['site', 'Gunter’s Space Page', 'https://space.skyrocket.de', 'en', 'Danh mục vệ tinh và tên lửa']
  ]
};
S.s_orbit = {
  vi: 'Cơ học quỹ đạo và cơ học thiên thể', ru: 'Орбитальная механика и небесная механика', en: 'Orbital mechanics',
  tp: ['законы Кеплера', 'элементы орбиты', 'маневры', 'возмущения J2', 'ССО', 'TLE и SGP4'], h: 6, core: 1,
  qr: 'орбитальная механика лекции', qe: 'orbital mechanics lecture',
  f: 'Định luật Kepler, sáu phần tử quỹ đạo, phương trình vis-viva, chuyển quỹ đạo Hohmann, nhiễu J2 và quỹ đạo đồng bộ mặt trời, chu kỳ lặp và vệt quét, TLE và SGP4, các hệ toạ độ ECI và ECEF.',
  r: [
    ['book', 'Охоцимский Д. Е., Сихарулидзе Ю. Г. Основы механики космического полёта', '', 'ru', 'Kinh điển của Nga'],
    ['book', 'Бордовицына Т. В., Авдюшев В. А. Теория движения искусственных спутников Земли', '', 'ru', 'Phương pháp giải tích và số'],
    ['book', 'Curtis H. Orbital Mechanics for Engineering Students', '', 'en', 'Giáo trình phổ biến'],
    ['book', 'Vallado D. Fundamentals of Astrodynamics and Applications', '', 'en', 'Sách tham khảo chuẩn'],
    ['data', 'CelesTrak', 'https://celestrak.org', 'en', 'TLE, bài viết của T. S. Kelso'],
    ['tool', 'Skyfield', 'https://rhodesmill.org/skyfield/', 'en', 'Tính vị trí vệ tinh trong Python'],
    ['tool', 'Stuff in Space', 'https://stuffin.space', 'en', 'Xem vệ tinh trên quỹ đạo theo thời gian thực']
  ]
};
S.s_adcs = {
  vi: 'Hệ xác định và điều khiển tư thế (ADCS)', ru: 'Системы ориентации и стабилизации', en: 'Attitude determination and control',
  tp: ['кватернионы', 'датчики звёзд и Солнца', 'маховики', 'магнитные катушки', 'гравитационная стабилизация'], h: 4,
  qr: 'система ориентации и стабилизации космического аппарата', qe: 'spacecraft attitude determination control',
  f: 'Biểu diễn tư thế (DCM, quaternion), cảm biến (sao, mặt trời, từ kế, con quay), cơ cấu chấp hành (bánh đà, cuộn từ, động cơ), ổn định trọng trường và ổn định quay, thuật toán TRIAD và QUEST, ảnh hưởng của độ chính xác hướng tới định vị ảnh.',
  r: [
    ['book', 'Раушенбах Б. В., Токарь Е. Н. Управление ориентацией космических аппаратов', '', 'ru', 'Kinh điển'],
    ['book', 'Белецкий В. В. Движение спутника относительно центра масс в гравитационном поле', '', 'ru', 'Kinh điển'],
    ['book', 'Wertz J. Spacecraft Attitude Determination and Control', '', 'en', 'Sổ tay chuẩn']
  ]
};
S.s_comm = {
  vi: 'Liên lạc vệ tinh và đo xa', ru: 'Спутниковая связь и телеметрия', en: 'Satellite communications',
  tp: ['бюджет радиолинии', 'диапазоны', 'модуляция и кодирование', 'Доплер', 'наземные станции', 'CCSDS'], h: 4,
  qr: 'спутниковая связь бюджет радиолинии', qe: 'satellite communications link budget',
  f: 'Ngân sách đường truyền (EIRP, G/T, C/N0, Eb/N0), băng UHF, S, X, Ka, điều chế và mã hoá, dịch Doppler, trạm mặt đất, chuẩn CCSDS, cửa sổ liên lạc LEO, truyền dữ liệu ảnh xuống đất.',
  r: [
    ['book', 'Камнев В. Е., Черкасов В. В., Чечин Г. В. Спутниковые сети связи', '', 'ru', 'Giáo trình'],
    ['book', 'Maral G., Bousquet M. Satellite Communications Systems', '', 'en', 'Sách chuẩn'],
    ['site', 'CCSDS: Published Standards', 'https://public.ccsds.org', 'en', 'Chuẩn liên lạc vũ trụ'],
    ['tool', 'SatNOGS', 'https://satnogs.org', 'en', 'Mạng trạm mặt đất mở'],
    ['tool', 'GNU Radio', 'https://www.gnuradio.org', 'en', 'Vô tuyến định nghĩa bằng phần mềm']
  ]
};
S.s_cubesat = {
  vi: 'Thiết kế vệ tinh nhỏ (CubeSat)', ru: 'Основы проектирования малых спутников (CubeSat)', en: 'Small satellite (CubeSat) design',
  tp: ['стандарт CubeSat', 'бюджеты массы и энергии', 'испытания', 'попутный запуск', 'космический мусор'], h: 3,
  qr: 'проектирование кубсатов малых спутников', qe: 'CubeSat design course',
  f: 'Chuẩn 1U–12U, phân hệ thương mại COTS, ngân sách khối lượng, năng lượng, dữ liệu; thử nghiệm rung và chân không nhiệt; phóng ghép; tuổi thọ quỹ đạo và rác vũ trụ.',
  r: [
    ['book', 'Cappelletti C., Battistini S., Malphrus B. (eds.) CubeSat Handbook: From Mission Design to Operations', '', 'en', 'Tổng quan đầy đủ'],
    ['data', 'Nanosats Database', 'https://www.nanosats.eu', 'en', 'Cơ sở dữ liệu vệ tinh nano'],
    ['site', 'Libre Space Foundation', 'https://libre.space', 'en', 'Phần cứng vệ tinh mở']
  ]
};
S.s_law = {
  vi: 'Luật hoạt động vũ trụ', ru: 'Нормативно-правовая база космической деятельности', en: 'Space law',
  tp: ['Договор о космосе 1967', 'конвенции об ответственности и регистрации', 'принципы ООН по ДЗЗ', 'лицензирование'], h: 2,
  qr: 'международное космическое право лекция', qe: 'space law introduction',
  f: 'Hiệp ước Không gian vũ trụ 1967, Công ước trách nhiệm 1972, Công ước đăng ký 1975, Nguyên tắc của LHQ về viễn thám 1986, cấp phép hoạt động vũ trụ quốc gia, chính sách dữ liệu mở (Copernicus, Landsat).',
  r: [
    ['book', 'Жуков Г. П., Абашидзе А. Х. Международное космическое право', '', 'ru', 'Giáo trình'],
    ['site', 'UNOOSA: Space Law', 'https://www.unoosa.org/oosa/en/ourwork/spacelaw/index.html', 'en', 'Văn bản các hiệp ước'],
    ['law', 'Закон РФ «О космической деятельности» (tìm bản hiện hành)', 'https://www.google.com/search?q=%D0%97%D0%B0%D0%BA%D0%BE%D0%BD+%D0%A0%D0%A4+%C2%AB%D0%9E+%D0%BA%D0%BE%D1%81%D0%BC%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B9+%D0%B4%D0%B5%D1%8F%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8%C2%BB+5663-1', 'ru', 'Liên kết tìm kiếm']
  ]
};
S.s_mission = {
  vi: 'Cơ học quỹ đạo nâng cao và lập kế hoạch nhiệm vụ', ru: 'Продвинутая орбитальная механика и планирование миссий', en: 'Mission design',
  tp: ['задача Ламберта', 'бюджет Δv', 'гравитационные манёвры', 'спутниковые группировки', 'окна запуска'], h: 4,
  qr: 'проектирование космических миссий баллистика', qe: 'space mission design trajectory',
  f: 'Chuyển quỹ đạo Hohmann và bi-elliptic, ngân sách Δv và phương trình Tsiolkovsky, cửa sổ phóng, bài toán Lambert, patched conics, hỗ trợ trọng trường, thiết kế chòm vệ tinh (Walker) cho độ phủ và thời gian quay lại.',
  r: [
    ['book', 'Battin R. An Introduction to the Mathematics and Methods of Astrodynamics', '', 'en', 'Nâng cao'],
    ['tool', 'NASA JPL Horizons', 'https://ssd.jpl.nasa.gov/horizons/', 'en', 'Lịch thiên văn chính xác']
  ]
};
S.s_dyn = {
  vi: 'Động lực học và điều khiển tàu vũ trụ', ru: 'Динамика космического аппарата и управление', en: 'Spacecraft dynamics and control',
  tp: ['уравнения Эйлера', 'линеаризация', 'синтез регуляторов', 'возмущающие моменты'], h: 4,
  qr: 'динамика космического аппарата управление лекции', qe: 'spacecraft dynamics control course',
  f: 'Phương trình Euler cho vật rắn, động lực học tư thế và quỹ đạo, tuyến tính hoá quanh điểm làm việc, điều khiển tư thế PD và LQR, mô men nhiễu (trọng trường, khí động, áp suất bức xạ), kết cấu đàn hồi.',
  r: [
    ['book', 'Бранец В. Н., Шмыглевский И. П. Применение кватернионов в задачах ориентации твёрдого тела', '', 'ru', 'Kinh điển'],
    ['book', 'Schaub H., Junkins J. Analytical Mechanics of Space Systems', '', 'en', 'Sách chuẩn'],
    ['course', 'Coursera: Spacecraft Dynamics and Control (CU Boulder)', 'https://www.coursera.org/specializations/spacecraft-dynamics-control', 'en', 'H. Schaub, dự thính miễn phí']
  ]
};
S.s_syseng = {
  vi: 'Kỹ thuật hệ thống cho vệ tinh', ru: 'Проектирование спутниковых систем', en: 'Space systems engineering',
  tp: ['требования', 'бюджеты массы, энергии, тепла', 'V-модель', 'FMEA', 'TRL'], h: 3,
  qr: 'системная инженерия космических систем', qe: 'space systems engineering',
  f: 'Vòng đời dự án (pha 0 đến F), yêu cầu và truy vết, ngân sách khối lượng, công suất, nhiệt, dữ liệu và biên dự phòng, mô hình chữ V, kiểm định và xác nhận, FMEA, thang TRL.',
  r: [
    ['book', 'Косяков А. и др. Системная инженерия. Принципы и практика', '', 'ru', 'Bản dịch của Kossiakoff'],
    ['site', 'ECSS: European Cooperation for Space Standardization', 'https://ecss.nl', 'en', 'Bộ chuẩn kỹ thuật vũ trụ châu Âu']
  ]
};
S.s_sim = {
  vi: 'Phần mềm mô phỏng quỹ đạo: STK, GMAT, Orekit', ru: 'Симуляторы и моделирование (STK, GMAT, MATLAB/Simulink)', en: 'Orbit simulation tools',
  tp: ['STK', 'GMAT', 'Orekit', 'MATLAB/Simulink', 'SGP4'], h: 4,
  qr: 'STK GMAT моделирование орбит', qe: 'GMAT STK orbit simulation tutorial',
  f: 'Mô phỏng quỹ đạo và vệt quét cảm biến, tính cửa sổ chụp qua một khu vực, tính thời gian liên lạc với trạm mặt đất, lan truyền TLE bằng SGP4.',
  r: [
    ['tool', 'MATLAB Aerospace Toolbox', 'https://www.mathworks.com/products/aerospace-toolbox.html', 'en', 'Công cụ hàng không vũ trụ trong MATLAB'],
    ['tool', 'Skyfield', 'https://rhodesmill.org/skyfield/', 'en', 'Python, SGP4']
  ]
};
S.rs_basics = {
  vi: 'Cơ sở vật lý của viễn thám', ru: 'Дистанционное зондирование Земли: физические основы', en: 'Remote sensing fundamentals',
  tp: ['электромагнитный спектр', 'окна прозрачности', 'спектральная отражательная способность', 'виды разрешения', 'уровни обработки'], h: 6, core: 1,
  qr: 'дистанционное зондирование Земли лекции', qe: 'remote sensing fundamentals lecture',
  f: 'Phổ điện từ và cửa sổ khí quyển, đường cong phản xạ phổ của thực vật, nước, đất; độ phân giải không gian, phổ, thời gian, bức xạ; cảm biến chủ động và bị động; quét đẩy và quét chổi; mức xử lý dữ liệu (L1C, L2A); hiệu chỉnh khí quyển.',
  r: [
    ['book', 'Шовенгердт Р. А. Дистанционное зондирование. Модели и методы обработки изображений', '', 'ru', 'Bản dịch của Schowengerdt'],
    ['book', 'Чандра А. М., Гош С. К. Дистанционное зондирование и географические информационные системы', '', 'ru', 'Nhập môn'],
    ['book', 'Лабутина И. А. Дешифрирование аэрокосмических снимков', '', 'ru', 'Giải đoán ảnh'],
    ['book', 'Книжников Ю. Ф., Кравцова В. И., Тутубалина О. В. Аэрокосмические методы географических исследований', '', 'ru', 'Giáo trình МГУ'],
    ['book', 'Jensen J. Remote Sensing of the Environment: An Earth Resource Perspective', '', 'en', 'Giáo trình chuẩn'],
    ['book', 'Lillesand T., Kiefer R., Chipman J. Remote Sensing and Image Interpretation', '', 'en', 'Giáo trình chuẩn'],
    ['site', 'NASA Earth Observatory: Remote Sensing', 'https://earthobservatory.nasa.gov/features/RemoteSensing', 'en', 'Giới thiệu ngắn'],
    ['site', 'USGS: Landsat Missions', 'https://www.usgs.gov/landsat-missions', 'en', 'Thông số Landsat'],
    ['site', 'SentiWiki (Copernicus Sentinel)', 'https://sentiwiki.copernicus.eu', 'en', 'Thông số các vệ tinh Sentinel']
  ]
};
S.rs_geodesy = {
  vi: 'Trắc địa và bản đồ', ru: 'Геодезия и картография', en: 'Geodesy and cartography',
  tp: ['эллипсоиды и датумы', 'системы высот', 'квазигеоид', 'картографические проекции', 'ГНСС', 'преобразование координат'], h: 5, core: 1,
  qr: 'геодезия картография системы координат лекции', qe: 'geodesy coordinate systems map projections',
  f: 'Elipxoit và datum (WGS 84, ГСК-2011, ПЗ-90.11, VN-2000), hệ độ cao (trực giao, chuẩn), geoid và quasigeoid, phép chiếu (UTM, Gauss–Krüger), chuyển đổi toạ độ Helmert 7 tham số, GNSS (RTK, PPP, nguồn sai số), độ chính xác bản đồ và tỷ lệ.',
  r: [
    ['book', 'Огородова Л. В. Высшая геодезия', '', 'ru', 'Giáo trình МИИГАиК'],
    ['book', 'Поклад Г. Г., Гриднев С. П. Геодезия', '', 'ru', 'Giáo trình'],
    ['book', 'Серапинас Б. Б. Глобальные системы позиционирования', '', 'ru', 'GNSS'],
    ['book', 'Берлянт А. М. Картография', '', 'ru', 'Giáo trình МГУ'],
    ['book', 'Hofmann-Wellenhof B., Moritz H. Physical Geodesy', '', 'en', 'Kinh điển'],
    ['tool', 'EPSG.io', 'https://epsg.io', 'en', 'Tra cứu hệ toạ độ'],
    ['tool', 'PROJ', 'https://proj.org', 'en', 'Chuyển đổi toạ độ'],
    ['data', 'ICGEM (mô hình trọng trường toàn cầu)', 'https://icgem.gfz-potsdam.de', 'en', 'Mô hình geoid, EGM2008'],
    ['tool', 'RTKLIB', 'https://www.rtklib.com', 'en', 'Xử lý GNSS'],
    ['site', 'ESA Navipedia', 'https://gssc.esa.int/navipedia/', 'en', 'Bách khoa GNSS']
  ]
};
S.rs_gis = {
  vi: 'GIS và dữ liệu không gian (QGIS, ArcGIS)', ru: 'ГИС и пространственный анализ', en: 'GIS and spatial analysis',
  tp: ['векторные и растровые данные', 'топология', 'перепроецирование', 'буферы и оверлей', 'интерполяция', 'OGC'], h: 6, core: 1,
  qr: 'QGIS уроки ГИС для начинающих', qe: 'QGIS tutorial GIS spatial analysis',
  f: 'Mô hình dữ liệu vector và raster, topology, chiếu lại hệ toạ độ, phân tích không gian (buffer, overlay, nội suy IDW và kriging, phân tích mạng), raster calculator, bản đồ chuyên đề, chất lượng dữ liệu, chuẩn OGC (WMS, WFS).',
  r: [
    ['book', 'Де Мерс М. Географические информационные системы. Основы', '', 'ru', 'Bản dịch'],
    ['book', 'Капралов Е. Г., Кошкарев А. В., Тикунов В. С. Геоинформатика', '', 'ru', 'Giáo trình'],
    ['book', 'Longley P. et al. Geographic Information Science and Systems', '', 'en', 'Giáo trình chuẩn'],
    ['site', 'GIS-Lab', 'https://gis-lab.info', 'ru', 'Cộng đồng GIS tiếng Nga, nhiều bài thực hành'],
    ['tool', 'QGIS', 'https://qgis.org', 'en', 'GIS mã nguồn mở'],
    ['site', 'Esri Training', 'https://www.esri.com/training/', 'en', 'Khoá ArcGIS, nhiều khoá miễn phí']
  ]
};
S.rs_photogram = {
  vi: 'Chụp ảnh hàng không và quang trắc', ru: 'Аэрофотосъёмка и фотограмметрия', en: 'Aerial photography and photogrammetry',
  tp: ['уравнения коллинеарности', 'внутреннее и внешнее ориентирование', 'стереопара', 'фототриангуляция', 'GSD', 'ортотрансформирование'], h: 6, core: 1,
  qr: 'фотограмметрия лекции аэрофотосъёмка', qe: 'photogrammetry lecture',
  f: 'Phương trình đồng tuyến, định hướng trong và ngoài, cặp ảnh lập thể và thị sai, điểm khống chế ảnh, tam giác ảnh không gian, GSD = H·kích thước pixel/f, độ chồng phủ dọc và ngang, nắn ảnh trực giao.',
  r: [
    ['book', 'Михайлов А. П., Чибуничев А. Г. Фотограмметрия', '', 'ru', 'Giáo trình МИИГАиК'],
    ['book', 'Kraus K. Photogrammetry: Geometry from Images and Laser Scans', '', 'en', 'Kinh điển'],
    ['book', 'Wolf P., Dewitt B., Wilkinson B. Elements of Photogrammetry with Applications in GIS', '', 'en', 'Giáo trình chuẩn'],
    ['site', 'ISPRS', 'https://www.isprs.org', 'en', 'Hiệp hội Quang trắc và Viễn thám Quốc tế']
  ]
};
S.rs_multispec = {
  vi: 'Ảnh đa phổ và siêu phổ, chỉ số phổ, phân loại', ru: 'Мультиспектральная и гиперспектральная обработка', en: 'Multispectral and hyperspectral analysis',
  tp: ['NDVI, NDWI, NDBI', 'атмосферная коррекция', 'маски облаков', 'классификация', 'спектральные библиотеки', 'PCA/MNF'], h: 7, core: 1,
  qr: 'обработка мультиспектральных снимков классификация', qe: 'multispectral hyperspectral image classification',
  f: 'NDVI, NDWI, MNDWI, NDBI, EVI, SAVI và giới hạn của chúng; hiệu chỉnh khí quyển (DOS, 6S, Sen2Cor); mặt nạ mây (s2cloudless, Fmask); phân loại có giám sát (RF, SVM) và không giám sát; endmember và tách phổ; giảm chiều siêu phổ (PCA, MNF).',
  r: [
    ['book', 'Richards J. Remote Sensing Digital Image Analysis', '', 'en', 'Giáo trình chuẩn về phân loại'],
    ['book', 'Chang C.-I. Hyperspectral Imaging: Techniques for Spectral Detection and Classification', '', 'en', 'Siêu phổ'],
    ['tool', 'ESA SNAP', 'https://step.esa.int/main/toolboxes/snap/', 'en', 'Xử lý Sentinel'],
    ['tool', 'EnMAP-Box', 'https://enmap-box.readthedocs.io', 'en', 'Xử lý ảnh siêu phổ trong QGIS'],
    ['tool', 'Spectral Python (SPy)', 'https://www.spectralpython.net', 'en', 'Thư viện siêu phổ'],
    ['data', 'ECOSTRESS Spectral Library (NASA JPL)', 'https://speclib.jpl.nasa.gov', 'en', 'Thư viện phổ']
  ]
};
S.rs_sar = {
  vi: 'Ảnh radar SAR và giao thoa InSAR', ru: 'Радарные данные (SAR), интерферометрия', en: 'SAR and InSAR',
  tp: ['синтез апертуры', 'поляризация', 'спекл', 'геометрические искажения', 'InSAR', 'когерентность'], h: 7, core: 1,
  qr: 'радиолокационная съёмка SAR интерферометрия Sentinel-1', qe: 'SAR InSAR tutorial Sentinel-1',
  f: 'Nguyên lý tổng hợp khẩu độ, độ phân giải theo phương bay và theo khoảng cách, phân cực VV và VH, nhiễu đốm và lọc, méo hình học (layover, foreshortening, bóng), hệ số tán xạ ngược σ0, InSAR và DInSAR, coherence, PS và SBAS, phát hiện ngập lụt bằng Sentinel-1.',
  r: [
    ['paper', 'Moreira A. et al. A tutorial on synthetic aperture radar (IEEE GRSM, 2013)', 'https://doi.org/10.1109/MGRS.2013.2248301', 'en', 'Bài tổng quan nền tảng'],
    ['book', 'Woodhouse I. Introduction to Microwave Remote Sensing', '', 'en', 'Nhập môn'],
    ['book', 'Hanssen R. Radar Interferometry: Data Interpretation and Error Analysis', '', 'en', 'InSAR kinh điển'],
    ['book', 'Верба В. С. и др. Радиолокационные системы землеобзора космического базирования', '', 'ru', 'Chuyên khảo tiếng Nga'],
    ['tool', 'MintPy', 'https://github.com/insarlab/MintPy', 'en', 'Phân tích chuỗi InSAR']
  ]
};
S.rs_lidar = {
  vi: 'Dữ liệu lidar và đám mây điểm', ru: 'Лидарные данные и облака точек', en: 'Lidar and point clouds',
  tp: ['многократные отражения', 'LAS/LAZ', 'классификация точек', 'ЦМР, ЦММ, CHM', 'ICP'], h: 5,
  qr: 'лазерное сканирование лидар облако точек обработка', qe: 'lidar point cloud processing tutorial',
  f: 'Nguyên lý đo xa laser, nhiều tín hiệu phản hồi, mật độ điểm, định dạng LAS và LAZ, lọc điểm mặt đất (CSF, PMF), tạo DTM, DSM, CHM, ghép đám mây (ICP), so sánh lidar với ảnh lập thể SfM.',
  r: [
    ['book', 'Медведев Е. М., Данилин И. М., Мельников С. Р. Лазерная локация земли и леса', '', 'ru', 'Chuyên khảo tiếng Nga'],
    ['book', 'Vosselman G., Maas H.-G. Airborne and Terrestrial Laser Scanning', '', 'en', 'Sách chuẩn'],
    ['tool', 'PDAL', 'https://pdal.io', 'en', 'Pipeline xử lý đám mây điểm'],
    ['tool', 'LAStools (rapidlasso)', 'https://rapidlasso.de', 'en', 'Công cụ lidar'],
    ['tool', 'laspy', 'https://laspy.readthedocs.io', 'en', 'Đọc ghi LAS trong Python']
  ]
};
S.rs_fusion = {
  vi: 'Kết hợp dữ liệu đa nguồn, đánh giá độ chính xác', ru: 'Интеграция разнородных данных, контроль точности', en: 'Data fusion and accuracy assessment',
  tp: ['матрица ошибок', 'OA, PA, UA', 'стратифицированная выборка', 'оценка площадей', 'pansharpening', 'оптика + SAR'], h: 5, core: 1,
  qr: 'оценка точности классификации матрица ошибок', qe: 'accuracy assessment land cover classification',
  f: 'Ma trận nhầm lẫn, OA, PA, UA; Kappa và vì sao nên ước lượng diện tích theo khuyến nghị của Olofsson; lấy mẫu phân tầng; kết hợp ở mức pixel, đặc trưng, quyết định; pansharpening; Sentinel-1 cùng Sentinel-2; đồng bộ không gian–thời gian; kiểm chứng thực địa.',
  r: [
    ['paper', 'Olofsson P. et al. Good practices for estimating area and assessing accuracy of land change (RSE, 2014)', 'https://doi.org/10.1016/j.rse.2014.02.015', 'en', 'Bài phải đọc khi đánh giá độ chính xác'],
    ['paper', 'Foody G. Status of land cover classification accuracy assessment (RSE, 2002)', 'https://doi.org/10.1016/S0034-4257(01)00295-4', 'en', 'Tổng quan kinh điển'],
    ['book', 'Congalton R., Green K. Assessing the Accuracy of Remotely Sensed Data', '', 'en', 'Sách chuẩn'],
    ['site', 'Google Earth Engine: Supervised Classification', 'https://developers.google.com/earth-engine/guides/classification', 'en', 'Phân loại và ma trận lỗi trong GEE'],
    ['tool', 'Collect Earth Online', 'https://collect.earth', 'en', 'Thu mẫu kiểm chứng trên ảnh']
  ]
};
S.rs_bigdata = {
  vi: 'Xử lý dữ liệu viễn thám lớn: GEE, xarray, STAC', ru: 'Автоматизация обработки больших данных ДЗЗ', en: 'Big Earth observation data',
  tp: ['Google Earth Engine', 'STAC и COG', 'xarray и Dask', 'кубы данных', 'облачные платформы'], h: 7, core: 1,
  qr: 'Google Earth Engine уроки', qe: 'Google Earth Engine tutorial',
  f: 'Mô hình tính toán của GEE (client và server, map, reduce), ảnh tổng hợp theo thời gian, xuất dữ liệu; STAC và COG để đọc theo khối; xarray và Dask tính lười; khối dữ liệu (Open Data Cube); hạn mức và chi phí; pipeline tái lập được.',
  r: [
    ['site', 'Google Earth Engine: Guides', 'https://developers.google.com/earth-engine/guides', 'en', 'Tài liệu chính thức'],
    ['tool', 'Earth Engine Code Editor', 'https://code.earthengine.google.com', 'en', 'Môi trường viết mã GEE'],
    ['tool', 'geemap', 'https://geemap.org', 'en', 'GEE trong Python và Jupyter'],
    ['tool', 'openEO', 'https://openeo.org', 'en', 'API xử lý dữ liệu EO thống nhất'],
    ['site', 'Pangeo', 'https://pangeo.io', 'en', 'Cộng đồng khoa học dữ liệu địa cầu'],
    ['tool', 'Open Data Cube', 'https://www.opendatacube.org', 'en', 'Khối dữ liệu viễn thám']
  ]
};
S.t_geo = {
  vi: 'Thư viện không gian Python: rasterio, GDAL, geopandas', ru: 'Обработка пространственных данных в Python', en: 'Python geospatial stack',
  tp: ['rasterio', 'GDAL/OGR', 'geopandas', 'shapely', 'pyproj', 'rioxarray'], h: 5, core: 1,
  qr: 'GDAL rasterio geopandas Python', qe: 'rasterio geopandas GDAL tutorial',
  f: 'Đọc ghi raster theo cửa sổ, CRS và phép biến đổi affine, nội suy khi chiếu lại, vector hoá và raster hoá, spatial join, cắt theo đa giác, GDAL CLI (gdalwarp, gdal_translate, ogr2ogr), VRT.',
  r: [
    ['site', 'rasterio', 'https://rasterio.readthedocs.io', 'en', 'Tài liệu chính thức'],
    ['site', 'GeoPandas', 'https://geopandas.org', 'en', 'Tài liệu chính thức'],
    ['site', 'Shapely', 'https://shapely.readthedocs.io', 'en', 'Tài liệu chính thức'],
    ['site', 'pyproj', 'https://pyproj4.github.io/pyproj/', 'en', 'Tài liệu chính thức'],
    ['course', 'Earth Lab: Earth Data Science', 'https://www.earthdatascience.org', 'en', 'Bài học Python cho dữ liệu địa cầu']
  ]
};
S.t_eodata = {
  vi: 'Nguồn dữ liệu viễn thám', ru: 'Данные ДЗЗ и каталоги', en: 'Earth observation data sources',
  tp: ['Copernicus', 'Landsat', 'Sentinel-1/2', 'каталоги', 'лицензии'], h: 3, core: 1,
  qr: 'где скачать спутниковые снимки Sentinel Landsat', qe: 'download Sentinel Landsat data tutorial',
  f: 'Chọn dữ liệu theo bài toán: độ phân giải, chu kỳ lặp, mức xử lý, giấy phép; quy trình tìm, tải, kiểm tra metadata; dữ liệu Nga (Канопус-В, Ресурс-П) qua Геопортал Роскосмоса.',
  r: [
    ['data', 'Геопортал Роскосмоса', 'https://gptl.ru', 'ru', 'Ảnh vệ tinh Nga'],
    ['data', 'ASF Data Search (Vertex)', 'https://search.asf.alaska.edu', 'en', 'Dữ liệu SAR'],
    ['data', 'JAXA G-Portal', 'https://gportal.jaxa.jp', 'en', 'Dữ liệu vệ tinh Nhật Bản'],
    ['data', 'OpenAerialMap', 'https://openaerialmap.org', 'en', 'Ảnh hàng không và UAV mở']
  ]
};
S.t_formats = {
  vi: 'Định dạng dữ liệu: GeoTIFF/COG, NetCDF, HDF5, Zarr', ru: 'Форматы и стандарты', en: 'Geospatial data formats',
  tp: ['GeoTIFF и COG', 'NetCDF', 'HDF5', 'Zarr', 'GeoPackage', 'GeoParquet'], h: 2,
  qr: 'форматы геоданных GeoTIFF NetCDF', qe: 'geospatial data formats COG NetCDF Zarr',
  f: 'GeoTIFF và COG (tile, overview), NetCDF và HDF5 (đa chiều, metadata CF), Zarr cho đám mây, GeoPackage thay Shapefile, GeoParquet, nén (LZW, DEFLATE, ZSTD), nodata và kiểu dữ liệu.',
  r: [
    ['site', 'NetCDF (Unidata)', 'https://www.unidata.ucar.edu/software/netcdf/', 'en', 'Định dạng mảng đa chiều'],
    ['site', 'CF Conventions', 'https://cfconventions.org', 'en', 'Quy ước metadata cho khí hậu và dự báo'],
    ['site', 'The HDF Group', 'https://www.hdfgroup.org', 'en', 'HDF5'],
    ['site', 'Zarr', 'https://zarr.dev', 'en', 'Mảng nén theo khối cho đám mây'],
    ['site', 'GeoParquet', 'https://geoparquet.org', 'en', 'Vector dạng cột'],
    ['site', 'GeoPackage', 'https://www.geopackage.org', 'en', 'Chuẩn OGC thay Shapefile']
  ]
};
})(window.KTT_DATA.subjects);

(function (S) {
S.en_phon = {
  vi: 'Ngữ âm thực hành tiếng Anh', ru: 'Практическая фонетика и произношение (английский)', en: 'English pronunciation',
  tp: ['IPA', 'артикуляция', 'ударение', 'интонация', 'ритм', 'слабые формы'], h: 5, core: 1,
  qr: 'английское произношение уроки', qe: 'English pronunciation lessons', qz: '英语发音 教学',
  f: 'Bảng IPA, nguyên âm dài và ngắn, âm /θ/ và /ð/, trọng âm từ và câu, nối âm, ngữ điệu câu hỏi, dạng yếu: quyết định người nghe có hiểu bạn khi phỏng vấn bằng tiếng Anh hay không.',
  r: [
    ['book', 'Соколова М. А. и др. Практическая фонетика английского языка', '', 'ru', 'Giáo trình chuẩn của Nga'],
    ['book', 'Hancock M. English Pronunciation in Use', '', 'en', 'Tự học có audio'],
    ['site', 'Cambridge Dictionary', 'https://dictionary.cambridge.org', 'en', 'Phiên âm Anh–Mỹ, có tiếng đọc'],
    ['tool', 'Forvo', 'https://forvo.com', 'en', 'Người bản ngữ đọc từ'],
    ['tool', 'Interactive IPA Chart', 'https://www.ipachart.com', 'en', 'Nghe từng âm IPA'],
    ['tool', 'Sounds of Speech (University of Iowa)', 'https://soundsofspeech.uiowa.edu', 'en', 'Hình động cách phát âm']
  ]
};
S.en_practical = {
  vi: 'Thực hành tiếng Anh tổng hợp', ru: 'Практический курс английского языка', en: 'English: integrated skills',
  tp: ['аудирование', 'говорение', 'чтение', 'письмо', 'самопрезентация'], h: 12, core: 1,
  qr: 'английский язык уроки говорение аудирование', qe: 'English speaking listening practice', qz: '英语口语 听力',
  f: 'Tự giới thiệu 2 phút, kể dự án theo STAR, mô tả luận án bằng ngôn ngữ phổ thông, nghe hiểu câu hỏi kỹ thuật, viết email công việc.',
  r: [
    ['book', 'Murphy R. English Grammar in Use', '', 'en', 'Ngữ pháp tự học'],
    ['book', 'Аракин В. Д. Практический курс английского языка', '', 'ru', 'Giáo trình đại học Nga'],
    ['site', 'BBC Learning English', 'https://www.bbc.co.uk/learningenglish', 'en', '6 Minute English, từ vựng, phát âm'],
    ['site', 'British Council: LearnEnglish', 'https://learnenglish.britishcouncil.org', 'en', 'Bài nghe, đọc, viết, nói theo trình độ'],
    ['site', 'TED Talks', 'https://www.ted.com', 'en', 'Nghe có phụ đề, nhiều chủ đề khoa học'],
    ['practice', 'italki', 'https://www.italki.com', 'en', 'Nói chuyện với giáo viên bản ngữ'],
    ['tool', 'Anki', 'https://apps.ankiweb.net', 'en', 'Thẻ từ lặp ngắt quãng']
  ]
};
S.en_grammar = {
  vi: 'Ngữ pháp lý thuyết tiếng Anh', ru: 'Теоретическая грамматика английского языка', en: 'Theoretical English grammar',
  tp: ['морфология', 'синтаксис', 'система времён', 'модальность', 'залог', 'артикль'], h: 5,
  qr: 'теоретическая грамматика английского языка лекции', qe: 'English grammar theory lecture', qz: '英语语法',
  f: 'Hệ thống thì và thể, câu bị động, câu điều kiện, mệnh đề quan hệ, mạo từ (khó cho người Việt và người Nga), động từ khuyết thiếu.',
  r: [
    ['book', 'Блох М. Я. Теоретическая грамматика английского языка', '', 'ru', 'Giáo trình chuẩn'],
    ['book', 'Quirk R. et al. A Comprehensive Grammar of the English Language', '', 'en', 'Tham khảo đầy đủ nhất'],
    ['book', 'Swan M. Practical English Usage', '', 'en', 'Tra cứu cách dùng']
  ]
};
S.en_lex = {
  vi: 'Từ vựng học tiếng Anh', ru: 'Лексикология английского языка', en: 'English lexicology',
  tp: ['словообразование', 'коллокации', 'синонимия', 'фразовые глаголы', 'терминология'], h: 4,
  qr: 'лексикология английского языка', qe: 'English collocations vocabulary', qz: '英语词汇',
  f: 'Cấu tạo từ (tiền tố, hậu tố), kết hợp từ, đồng nghĩa và sắc thái, cụm động từ, thuật ngữ chuyên ngành viễn thám, AI bằng tiếng Anh.',
  r: [
    ['book', 'Арнольд И. В. Лексикология современного английского языка', '', 'ru', 'Giáo trình chuẩn'],
    ['book', 'McCarthy M., O’Dell F. English Collocations in Use', '', 'en', 'Luyện kết hợp từ'],
    ['site', 'Oxford Learner’s Dictionaries', 'https://www.oxfordlearnersdictionaries.com', 'en', 'Từ điển cho người học'],
    ['tool', 'SkELL (Sketch Engine for Language Learning)', 'https://skell.sketchengine.eu', 'en', 'Câu ví dụ từ khối liệu thật'],
    ['tool', 'Ludwig', 'https://ludwig.guru', 'en', 'Kiểm tra câu bằng ví dụ thật']
  ]
};
S.en_style = {
  vi: 'Phong cách học và tu từ tiếng Anh', ru: 'Стилистика и риторика (английский)', en: 'English stylistics and rhetoric',
  tp: ['функциональные стили', 'выразительные средства', 'аргументация'], h: 3,
  qr: 'стилистика английского языка', qe: 'English stylistics rhetoric', qz: '英语修辞',
  f: 'Phong cách chức năng (khoa học, công vụ, báo chí), biện pháp tu từ, lập luận (luận điểm, bằng chứng, lý lẽ), viết ngắn gọn, ưu tiên thể chủ động.',
  r: [
    ['book', 'Гальперин И. Р. Стилистика английского языка', '', 'ru', 'Giáo trình chuẩn'],
    ['book', 'Арнольд И. В. Стилистика. Современный английский язык', '', 'ru', 'Giáo trình'],
    ['book', 'Strunk W., White E. B. The Elements of Style', '', 'en', 'Kinh điển về văn phong']
  ]
};
S.en_hist = {
  vi: 'Lịch sử tiếng Anh', ru: 'История английского языка', en: 'History of English',
  tp: ['древнеанглийский', 'среднеанглийский', 'норманнское завоевание', 'великий сдвиг гласных'], h: 3,
  qr: 'история английского языка лекции', qe: 'history of the English language', qz: '英语史',
  f: 'Các thời kỳ Old, Middle, Early Modern English, cuộc chinh phục Norman 1066, Great Vowel Shift, vay mượn từ Latin và Pháp, tiếng Anh toàn cầu.',
  r: [
    ['book', 'Ильиш Б. А. История английского языка', '', 'ru', 'Giáo trình'],
    ['book', 'Расторгуева Т. А. История английского языка', '', 'ru', 'Giáo trình'],
    ['book', 'Baugh A., Cable T. A History of the English Language', '', 'en', 'Kinh điển']
  ]
};
S.en_lit = {
  vi: 'Văn học các nước nói tiếng Anh', ru: 'Литература англоязычных стран', en: 'Literature in English',
  tp: ['Шекспир', 'викторианский роман', 'модернизм', 'американская литература'], h: 3,
  qr: 'английская литература лекции', qe: 'English literature lectures', qz: '英国文学',
  f: 'Shakespeare, Austen, Dickens, Woolf, Hemingway, Orwell: biết tác giả tiêu biểu theo thời kỳ và trào lưu.',
  r: [
    ['book', 'Аникин Г. В., Михальская Н. П. История английской литературы', '', 'ru', 'Giáo trình'],
    ['free', 'Project Gutenberg', 'https://www.gutenberg.org', 'en', 'Văn học kinh điển miễn phí']
  ]
};
S.l_intercult = {
  vi: 'Giao tiếp liên văn hoá', ru: 'Межкультурная коммуникация', en: 'Intercultural communication',
  tp: ['модель Хофстеде', 'высоко- и низкоконтекстные культуры', 'деловой этикет'], h: 3, core: 1,
  qr: 'межкультурная коммуникация лекции', qe: 'intercultural communication', qz: '跨文化交际',
  f: 'Mô hình Hofstede, văn hoá ngữ cảnh cao và thấp (Hall), mô hình Lewis; khác biệt Việt–Nga–Trung–Anh trong giao tiếp công việc, phản hồi và thời gian. Câu hỏi hay gặp: kể về làm việc trong nhóm đa văn hoá.',
  r: [
    ['book', 'Тер-Минасова С. Г. Язык и межкультурная коммуникация', '', 'ru', 'Giáo trình МГУ'],
    ['book', 'Майер Э. Карта культурных различий', '', 'ru', 'Bản dịch The Culture Map'],
    ['book', 'Льюис Р. Деловые культуры в международном бизнесе', '', 'ru', 'Mô hình Lewis']
  ]
};
S.zh_phon = {
  vi: 'Ngữ âm tiếng Trung phổ thông: pinyin, thanh điệu', ru: 'Практическая фонетика (путунхуа)', en: 'Mandarin phonetics',
  tp: ['пиньинь', 'тоны', 'слоговая структура', 'тональные сандхи', 'эризация'], h: 5, core: 1,
  qr: 'китайский язык фонетика тоны пиньинь', qe: 'Mandarin pinyin tones pronunciation', qz: '汉语拼音 声调 发音',
  f: 'Thanh mẫu và vận mẫu, bốn thanh và thanh nhẹ, biến điệu (3-3, 一, 不), phân biệt zh/ch/sh với z/c/s và j/q/x: những chỗ người Việt dễ nhầm.',
  r: [
    ['book', 'Задоенко Т. П., Хуан Шуин. Основы китайского языка', '', 'ru', 'Giáo trình kinh điển của Nga'],
    ['book', 'Спешнев Н. А. Фонетика китайского языка', '', 'ru', 'Lý thuyết ngữ âm'],
    ['tool', 'Pleco', 'https://www.pleco.com', 'en', 'Từ điển di động có phát âm'],
    ['tool', 'Forvo', 'https://forvo.com', 'en', 'Người bản ngữ đọc từ']
  ]
};
S.zh_hanzi = {
  vi: 'Chữ Hán: bộ thủ, thứ tự nét, thư pháp', ru: 'Иероглифика и каллиграфия', en: 'Chinese characters',
  tp: ['ключи', 'порядок черт', 'фоноидеограммы', 'упрощённые и полные иероглифы'], h: 6, core: 1,
  qr: 'китайские иероглифы ключи порядок черт', qe: 'Chinese characters radicals stroke order', qz: '汉字 部首 笔顺',
  f: '214 bộ thủ, quy tắc thứ tự nét, chữ hình thanh (thanh phù và hình phù), giản thể và phồn thể; tận dụng âm Hán–Việt để đoán nghĩa.',
  r: [
    ['book', 'Кондрашевский А. Ф. Практический курс китайского языка (с прописями)', '', 'ru', 'Giáo trình phổ biến ở Nga'],
    ['book', 'Heisig J., Richardson T. Remembering Simplified Hanzi', '', 'en', 'Phương pháp ghi nhớ chữ'],
    ['tool', 'Skritter', 'https://skritter.com', 'en', 'Luyện viết chữ có lặp ngắt quãng'],
    ['tool', 'Anki', 'https://apps.ankiweb.net', 'en', 'Thẻ chữ Hán']
  ]
};
S.zh_grammar = {
  vi: 'Ngữ pháp thực hành tiếng Trung', ru: 'Практическая грамматика китайского языка', en: 'Chinese grammar',
  tp: ['порядок слов', 'частицы 了/过/着', 'счётные слова', 'конструкции 把 и 被', 'дополнения результата'], h: 6,
  qr: 'грамматика китайского языка уроки', qe: 'Chinese grammar lessons', qz: '汉语语法 教学',
  f: 'Trật tự từ (thời gian, nơi chốn, hành động), 了/过/着, bổ ngữ kết quả, xu hướng, khả năng, câu 把 và 被, lượng từ, 是…的, so sánh với 比.',
  r: [
    ['book', 'Иванов А. И., Поливанов Е. Д. Грамматика современного китайского языка', '', 'ru', 'Kinh điển'],
    ['book', 'Горелов В. И. Теоретическая грамматика китайского языка', '', 'ru', 'Lý thuyết'],
    ['book', 'Ross C., Ma J.-H. S. Modern Mandarin Chinese Grammar', '', 'en', 'Tham khảo đầy đủ']
  ]
};
S.zh_practical = {
  vi: 'Thực hành tiếng Trung (HSK 1–4)', ru: 'Практический курс китайского языка', en: 'Practical Chinese (HSK 1–4)',
  tp: ['HSK', 'аудирование', 'чтение', 'разговор', 'самопрезентация'], h: 14, core: 1,
  qr: 'китайский язык HSK уроки', qe: 'Chinese HSK course', qz: 'HSK 课程 汉语',
  f: 'Lộ trình HSK 1 đến 4 (lưu ý cấu trúc đề HSK 3.0 mới), nghe mỗi ngày 15–20 phút, shadowing, giới thiệu bản thân và công việc bằng tiếng Trung.',
  r: [
    ['book', 'HSK 标准教程 (HSK Standard Course)', '', 'zh', 'Giáo trình chính thức theo HSK'],
    ['site', 'Du Chinese', 'https://www.duchinese.net', 'en', 'Bài đọc theo cấp độ, có audio'],
    ['tool', 'HelloChinese', 'https://www.hellochinese.cc', 'en', 'Ứng dụng học cơ bản']
  ]
};
S.zh_lex = {
  vi: 'Từ vựng và mẫu câu giao tiếp tiếng Trung', ru: 'Лексика и разговорные формулы (китайский)', en: 'Chinese vocabulary and phrases',
  tp: ['тематическая лексика', 'чэнъюй', 'вежливые формулы', 'формальный и неформальный регистр'], h: 5,
  qr: 'китайский разговорный язык лексика', qe: 'Chinese vocabulary phrases', qz: '汉语 常用词汇 口语',
  f: 'Từ vựng theo chủ đề (công việc, khoa học, công nghệ), thành ngữ 成语 thông dụng, câu lịch sự nơi công sở, cách xưng hô.',
  r: [
    ['tool', 'Pleco', 'https://www.pleco.com', 'en', 'Từ điển, thẻ từ'],
    ['tool', 'Hack Chinese', 'https://www.hackchinese.com', 'en', 'Học từ theo HSK có lặp ngắt quãng']
  ]
};
S.zh_culture = {
  vi: 'Văn hoá và truyền thống Trung Quốc', ru: 'Культура и традиции Китая', en: 'Chinese culture',
  tp: ['конфуцианство', 'даосизм', 'праздники', 'гуаньси', 'деловой этикет'], h: 3,
  qr: 'культура Китая лекции Маслов', qe: 'Chinese culture lecture', qz: '中国文化 讲座',
  f: 'Nho, Đạo, Phật; Tết Nguyên đán 春节, Trung thu 中秋; quan hệ 关系 và thể diện 面子; nghi thức bàn tiệc và danh thiếp; văn hoá doanh nghiệp Trung Quốc.',
  r: [
    ['book', 'Маслов А. А. Китай: колокольца в пыли. Странствия мага и интеллектуала', '', 'ru', 'Dễ đọc'],
    ['book', 'Малявин В. В. Китайская цивилизация', '', 'ru', 'Tổng quan'],
    ['book', 'Fairbank J., Goldman M. China: A New History', '', 'en', 'Lịch sử Trung Quốc']
  ]
};
S.zh_transl = {
  vi: 'Cơ sở dịch Trung ↔ Nga', ru: 'Основы перевода с китайского и на китайский', en: 'Chinese–Russian translation',
  tp: ['переводческие трансформации', 'чэнъюй', 'имена собственные', 'система Палладия', 'постредактирование'], h: 4,
  qr: 'перевод с китайского языка теория практика', qe: 'Chinese translation techniques', qz: '汉俄翻译',
  f: 'Các phép chuyển đổi khi dịch (thêm, bớt, đổi từ loại), dịch thành ngữ, câu dài nhiều định ngữ, tên riêng và phiên âm (hệ Palladius và pinyin), hậu biên tập bản dịch máy.',
  r: [
    ['book', 'Щичко В. Ф. Китайский язык. Теория и практика перевода', '', 'ru', 'Giáo trình dịch'],
    ['book', 'Семенас А. Л. Лексика китайского языка', '', 'ru', 'Từ vựng học'],
    ['tool', 'DeepL', 'https://www.deepl.com', 'en', 'Dịch máy'],
    ['tool', 'Яндекс Переводчик', 'https://translate.yandex.ru', 'ru', 'Dịch máy Trung–Nga']
  ]
};
S.zh_sinology = {
  vi: 'Nhập môn Hán học', ru: 'Введение в синологию', en: 'Introduction to sinology',
  tp: ['история письменности', 'диалекты', 'вэньянь и байхуа', 'реформа письменности', 'русская синология'], h: 3,
  qr: 'синология лекции история Китая', qe: 'sinology introduction', qz: '汉学 导论',
  f: 'Lịch sử chữ viết (giáp cốt đến khải thư), các phương ngữ lớn (官话, 粤, 吴, 闽…), văn ngôn và bạch thoại, cải cách giản thể những năm 1950, Hán học Nga (Bichurin, Alekseev).',
  r: [
    ['book', 'Софронов М. В. Китайский язык и китайское общество', '', 'ru', 'Ngôn ngữ và xã hội'],
    ['book', 'Norman J. Chinese (Cambridge Language Surveys)', '', 'en', 'Tổng quan ngôn ngữ học'],
    ['site', 'ИСАА МГУ (Институт стран Азии и Африки)', 'https://www.iaas.msu.ru', 'ru', 'Trung tâm Đông phương học МГУ']
  ]
};
S.ru_modern = {
  vi: 'Tiếng Nga hiện đại', ru: 'Современный русский язык', en: 'Modern Russian',
  tp: ['фонетика', 'морфология', 'синтаксис', 'орфография', 'пунктуация'], h: 5,
  qr: 'современный русский язык лекции', qe: 'Russian grammar', qz: '俄语语法',
  f: 'Cách (падеж) và sự chi phối của động từ, thể động từ, động từ chuyển động, dấu phẩy trong câu phức và cụm phân từ, trạng động từ, chính tả н/нн, не/ни.',
  r: [
    ['book', 'Валгина Н. С., Розенталь Д. Э., Фомина М. И. Современный русский язык', '', 'ru', 'Giáo trình chuẩn'],
    ['book', 'Лопатин В. В. (ред.) Правила русской орфографии и пунктуации. Полный академический справочник', '', 'ru', 'Chuẩn chính tả'],
    ['book', 'Розенталь Д. Э. Справочник по правописанию и литературной правке', '', 'ru', 'Tra cứu']
  ]
};
S.ru_style = {
  vi: 'Phong cách học tiếng Nga', ru: 'Стилистика русского языка', en: 'Russian stylistics',
  tp: ['функциональные стили', 'научный стиль', 'канцелярит', 'речевые ошибки'], h: 4, core: 1,
  qr: 'стилистика русского языка научный стиль', qe: 'Russian academic writing style', qz: '俄语修辞',
  f: 'Năm phong cách chức năng; phong cách khoa học (danh từ hoá, bị động, từ nối); tránh calque và kiểu văn hành chính канцелярит; viết аннотация, автореферат.',
  r: [
    ['book', 'Кожина М. Н. Стилистика русского языка', '', 'ru', 'Giáo trình chuẩn'],
    ['book', 'Голуб И. Б. Стилистика русского языка', '', 'ru', 'Nhiều bài tập'],
    ['book', 'Мильчин А. Э., Чельцова Л. К. Справочник издателя и автора', '', 'ru', 'Chuẩn biên tập'],
    ['site', 'Культура письменной речи (gramma.ru)', 'https://gramma.ru', 'ru', 'Bài viết về chuẩn mực']
  ]
};
S.ru_rhetoric = {
  vi: 'Tu từ học và văn hoá lời nói', ru: 'Риторика и культура речи', en: 'Rhetoric and speech culture',
  tp: ['орфоэпия', 'композиция выступления', 'аргументация', 'публичная речь'], h: 3,
  qr: 'риторика культура речи лекции', qe: 'public speaking rhetoric', qz: '演讲 修辞',
  f: 'Chuẩn trọng âm (звонИт, договОр), bố cục bài nói, lập luận và phản biện, nói trước hội đồng, trả lời câu hỏi khó.',
  r: [
    ['book', 'Введенская Л. А., Павлова Л. Г. Риторика и культура речи', '', 'ru', 'Giáo trình'],
    ['book', 'Чуковский К. И. Живой как жизнь', '', 'ru', 'Về văn hoá lời nói, dễ đọc']
  ]
};
S.ru_hist = {
  vi: 'Lịch sử tiếng Nga và phương ngữ học', ru: 'История русского языка и диалектология', en: 'History of Russian, dialectology',
  tp: ['древнерусский язык', 'падение редуцированных', 'реформа 1918 года', 'оканье и аканье'], h: 3,
  qr: 'история русского языка лекции', qe: 'history of the Russian language', qz: '俄语史',
  f: 'Từ tiếng Đông Slav cổ đến hiện đại, hiện tượng падение редуцированных, cải cách chính tả 1918, phương ngữ Bắc và Nam (оканье, аканье), thư vỏ bạch dương Novgorod.',
  r: [
    ['book', 'Горшкова К. В., Хабургаев Г. А. Историческая грамматика русского языка', '', 'ru', 'Giáo trình'],
    ['book', 'Аванесов Р. И. Русская диалектология', '', 'ru', 'Kinh điển'],
    ['book', 'Зализняк А. А. Из заметок о любительской лингвистике', '', 'ru', 'Phổ biến khoa học xuất sắc'],
    ['site', 'Древнерусские берестяные грамоты', 'http://gramoty.ru', 'ru', 'Kho thư vỏ bạch dương']
  ]
};
S.ru_lit = {
  vi: 'Văn học Nga', ru: 'Русская литература', en: 'Russian literature',
  tp: ['Пушкин', 'Гоголь', 'Толстой', 'Достоевский', 'Чехов', 'Серебряный век'], h: 4,
  qr: 'русская литература лекции', qe: 'Russian literature lectures', qz: '俄罗斯文学',
  f: 'Pushkin, Gogol, Tolstoy, Dostoevsky, Chekhov, Bulgakov: tác phẩm chính và trào lưu (lãng mạn, hiện thực, Thời Bạc).',
  r: [
    ['book', 'Лотман Ю. М. Беседы о русской культуре', '', 'ru', 'Văn hoá quý tộc thế kỷ XVIII–XIX'],
    ['book', 'Набоков В. В. Лекции по русской литературе', '', 'ru', 'Góc nhìn nhà văn'],
    ['book', 'Мирский Д. С. История русской литературы', '', 'ru', 'Tổng quan']
  ]
};
S.ru_method = {
  vi: 'Phương pháp dạy tiếng Nga', ru: 'Теория и методика преподавания русского языка', en: 'Russian language teaching methods',
  tp: ['коммуникативный подход', 'типы упражнений', 'контроль и оценка', 'цифровые инструменты'], h: 3,
  qr: 'методика преподавания русского языка', qe: 'teaching Russian methodology', qz: '俄语教学法',
  f: 'Phương pháp giao tiếp, thiết kế giáo án, các dạng bài tập, kiểm tra và đánh giá, công nghệ số trong dạy tiếng.',
  r: [
    ['book', 'Львов М. Р. и др. Методика преподавания русского языка', '', 'ru', 'Giáo trình'],
    ['book', 'Азимов Э. Г., Щукин А. Н. Новый словарь методических терминов и понятий', '', 'ru', 'Từ điển thuật ngữ phương pháp']
  ]
};
S.ru_rki = {
  vi: 'Tiếng Nga như ngoại ngữ (РКИ), kỳ thi ТРКИ', ru: 'Русский язык как иностранный (РКИ)', en: 'Russian as a foreign language',
  tp: ['ТРКИ', 'уровни A1–C2', 'типичные трудности', 'сопоставительный анализ'], h: 3,
  qr: 'РКИ методика уроки', qe: 'Russian as a foreign language', qz: '俄语 对外教学',
  f: 'Hệ thống ТРКИ (ТЭУ đến ТРКИ-4) đối chiếu CEFR, khó khăn điển hình của người Việt và người Trung khi học tiếng Nga, phương pháp so sánh đối chiếu.',
  r: [
    ['book', 'Щукин А. Н. Методика преподавания русского языка как иностранного', '', 'ru', 'Giáo trình chuẩn'],
    ['book', 'Антонова В. Е. и др. Дорога в Россию', '', 'ru', 'Giáo trình cho người nước ngoài'],
    ['book', 'Чернышов С. И. Поехали!', '', 'ru', 'Giáo trình phổ biến']
  ]
};
S.en_academic = {
  vi: 'Tiếng Anh học thuật và công việc, viết khoa học, IELTS', ru: 'Деловой и академический английский', en: 'Academic and business English',
  tp: ['IMRaD', 'аннотация', 'hedging', 'cover letter', 'IELTS'], h: 7, core: 1,
  qr: 'академический английский научное письмо', qe: 'academic English scientific writing', qz: '学术英语 写作',
  f: 'Cấu trúc IMRaD, viết abstract, hedging (may, suggest), trích dẫn và tránh đạo văn, email xin việc và cover letter, trình bày kết quả, IELTS Writing Task 2.',
  r: [
    ['book', 'Swales J., Feak C. Academic Writing for Graduate Students', '', 'en', 'Kinh điển viết học thuật'],
    ['book', 'Glasman-Deal H. Science Research Writing for Non-Native Speakers of English', '', 'en', 'Cho người không phải bản ngữ'],
    ['tool', 'Grammarly', 'https://www.grammarly.com', 'en', 'Kiểm tra ngữ pháp'],
    ['tool', 'Writefull', 'https://www.writefull.com', 'en', 'Gợi ý ngôn ngữ cho bài báo'],
    ['tool', 'Hemingway Editor', 'https://hemingwayapp.com', 'en', 'Rút gọn câu dài']
  ]
};
S.zh_advanced = {
  vi: 'Tiếng Trung nâng cao, thương mại, HSK 5–6', ru: 'Продвинутый китайский и бизнес-коммуникация', en: 'Advanced and business Chinese',
  tp: ['аутентичные тексты', 'деловая переписка', 'переговоры', 'научная терминология', 'HSK 5–6'], h: 7,
  qr: 'деловой китайский язык HSK 5 6', qe: 'business Chinese HSK 5 6', qz: '商务汉语 HSK5 HSK6',
  f: 'Đọc báo và văn bản chuyên ngành, email thương mại, đàm phán, thuật ngữ khoa học (遥感 viễn thám, 无人机 UAV, 人工智能 trí tuệ nhân tạo), HSK 5–6 và HSKK.',
  r: [
    ['site', 'The Chairman’s Bao', 'https://www.thechairmansbao.com', 'en', 'Tin tức chia theo cấp HSK'],
    ['site', '人民网 (People’s Daily Online)', 'http://www.people.com.cn', 'zh', 'Đọc báo tiếng Trung'],
    ['data', 'BCC 语料库 (Beijing Language and Culture University)', 'http://bcc.blcu.edu.cn', 'zh', 'Khối liệu tiếng Trung']
  ]
};
S.ru_advanced = {
  vi: 'Biên tập và phong cách nâng cao, nghiên cứu khối liệu tiếng Nga', ru: 'Углублённая стилистика и редактирование', en: 'Advanced Russian editing',
  tp: ['редактирование', 'научный текст', 'корпусные исследования', 'типографика'], h: 4,
  qr: 'редактирование научного текста', qe: 'Russian text editing corpus', qz: '俄语 编辑',
  f: 'Biên tập văn bản khoa học, rút gọn, kiểm tra thuật ngữ theo ГОСТ, dùng НКРЯ để kiểm tra kết hợp từ, typography (ngoặc «», gạch ngang —).',
  r: [
    ['book', 'Солганик Г. Я. Стилистика текста', '', 'ru', 'Phong cách văn bản'],
    ['tool', 'Главред', 'https://glvrd.ru', 'ru', 'Tìm từ thừa, văn hành chính'],
    ['tool', 'Орфограммка', 'https://orfogrammka.ru', 'ru', 'Kiểm tra chính tả, phong cách'],
    ['tool', 'LanguageTool', 'https://languagetool.org', 'ru', 'Kiểm tra ngữ pháp nhiều thứ tiếng']
  ]
};
S.l_theory = {
  vi: 'Ngôn ngữ học lý thuyết và tri nhận', ru: 'Теоретическая и когнитивная лингвистика', en: 'Theoretical and cognitive linguistics',
  tp: ['уровни языка', 'знак', 'концептуальная метафора', 'прототипы', 'язык и мышление'], h: 4,
  qr: 'когнитивная лингвистика лекции', qe: 'cognitive linguistics introduction', qz: '认知语言学',
  f: 'Ngôn ngữ như hệ thống ký hiệu (Saussure), các cấp độ (âm vị, hình vị, cú pháp, ngữ nghĩa), ngữ pháp tạo sinh và chức năng, ẩn dụ khái niệm, khung và nguyên mẫu.',
  r: [
    ['book', 'Плунгян В. А. Почему языки такие разные', '', 'ru', 'Phổ biến khoa học xuất sắc'],
    ['book', 'Маслова В. А. Когнитивная лингвистика', '', 'ru', 'Giáo trình'],
    ['book', 'Лакофф Дж., Джонсон М. Метафоры, которыми мы живём', '', 'ru', 'Kinh điển'],
    ['book', 'Evans V., Green M. Cognitive Linguistics: An Introduction', '', 'en', 'Giáo trình chuẩn']
  ]
};
S.l_socio = {
  vi: 'Ngôn ngữ học xã hội và ngữ dụng học', ru: 'Социолингвистика и прагматика', en: 'Sociolinguistics and pragmatics',
  tp: ['вариативность', 'билингвизм', 'речевые акты', 'импликатуры', 'вежливость'], h: 3,
  qr: 'социолингвистика прагматика лекции', qe: 'sociolinguistics pragmatics', qz: '社会语言学 语用学',
  f: 'Biến thể ngôn ngữ và song ngữ, chuyển mã, hành vi ngôn ngữ (Austin, Searle), nguyên tắc cộng tác và hàm ý (Grice), lịch sự (Brown và Levinson).',
  r: [
    ['book', 'Беликов В. И., Крысин Л. П. Социолингвистика', '', 'ru', 'Giáo trình'],
    ['book', 'Остин Дж. Как совершать действия при помощи слов', '', 'ru', 'Hành vi ngôn ngữ'],
    ['book', 'Yule G. Pragmatics', '', 'en', 'Nhập môn ngắn']
  ]
};
S.l_corpus = {
  vi: 'Ngôn ngữ học khối liệu', ru: 'Корпусная лингвистика', en: 'Corpus linguistics',
  tp: ['конкорданс', 'частотность', 'коллокации (MI, t-score, logDice)', 'разметка', 'НКРЯ'], h: 4,
  qr: 'корпусная лингвистика НКРЯ', qe: 'corpus linguistics AntConc', qz: '语料库语言学',
  f: 'Chỉ mục và KWIC, tần suất và phân bố, kết hợp từ (MI, t-score, logDice), chú giải hình thái và cú pháp, xây dựng khối liệu chuyên ngành.',
  r: [
    ['book', 'Захаров В. П., Богданова С. Ю. Корпусная лингвистика', '', 'ru', 'Giáo trình СПбГУ'],
    ['book', 'McEnery T., Hardie A. Corpus Linguistics: Method, Theory and Practice', '', 'en', 'Sách chuẩn'],
    ['data', 'English-Corpora.org (COCA, BNC)', 'https://www.english-corpora.org', 'en', 'Khối liệu tiếng Anh lớn']
  ]
};
S.l_typology = {
  vi: 'Loại hình học và ngôn ngữ học đối chiếu', ru: 'Типология и сопоставительная лингвистика', en: 'Linguistic typology',
  tp: ['изолирующие и флективные языки', 'порядок слов', 'универсалии Гринберга', 'сопоставление вьетнамского, русского, китайского, английского'], h: 3,
  qr: 'лингвистическая типология языковые универсалии', qe: 'linguistic typology universals', qz: '语言类型学',
  f: 'Loại hình hình thái (đơn lập: tiếng Việt, tiếng Trung; hoà kết: tiếng Nga; phân tích: tiếng Anh), trật tự SVO và SOV, phổ quát Greenberg, so sánh Việt–Nga–Trung–Anh.',
  r: [
    ['book', 'Плунгян В. А. Общая морфология. Введение в проблематику', '', 'ru', 'Giáo trình'],
    ['book', 'Комри Б. Языковые универсалии и лингвистическая типология', '', 'ru', 'Bản dịch'],
    ['data', 'Glottolog', 'https://glottolog.org', 'en', 'Danh mục ngôn ngữ thế giới']
  ]
};
S.l_transl = {
  vi: 'Dịch thuật và dịch thuật học, công cụ CAT', ru: 'Перевод и переводоведение', en: 'Translation studies and CAT tools',
  tp: ['эквивалентность', 'переводческие трансформации', 'технический перевод', 'память переводов', 'постредактирование МП'], h: 5,
  qr: 'теория перевода переводоведение лекции', qe: 'translation studies CAT tools', qz: '翻译理论',
  f: 'Tương đương dịch, các phép chuyển dịch (Бархударов), dịch kỹ thuật và thuật ngữ, bộ nhớ dịch và cơ sở thuật ngữ, hậu biên tập dịch máy, đánh giá chất lượng (BLEU, COMET).',
  r: [
    ['book', 'Комиссаров В. Н. Теория перевода (лингвистические аспекты)', '', 'ru', 'Kinh điển'],
    ['book', 'Бархударов Л. С. Язык и перевод', '', 'ru', 'Kinh điển'],
    ['book', 'Алексеева И. С. Введение в переводоведение', '', 'ru', 'Giáo trình'],
    ['book', 'Baker M. In Other Words: A Coursebook on Translation', '', 'en', 'Giáo trình chuẩn'],
    ['tool', 'Trados', 'https://www.trados.com', 'en', 'Công cụ CAT thương mại'],
    ['tool', 'MateCat', 'https://www.matecat.com', 'en', 'CAT trực tuyến miễn phí'],
    ['tool', 'Reverso Context', 'https://context.reverso.net', 'en', 'Ví dụ dịch song song']
  ]
};
S.l_nlp = {
  vi: 'Ngôn ngữ học máy tính và xử lý ngôn ngữ tự nhiên', ru: 'Компьютерная лингвистика и NLP', en: 'Computational linguistics and NLP',
  tp: ['токенизация', 'лемматизация', 'синтаксический разбор', 'NER', 'эмбеддинги', 'трансформеры', 'RAG'], h: 7,
  qr: 'обработка естественного языка NLP курс', qe: 'natural language processing course', qz: '自然语言处理 课程',
  f: 'Tách từ (BPE), lemma hoá (pymorphy), gán nhãn từ loại và phân tích phụ thuộc, NER, từ word2vec đến BERT và LLM, đánh giá (precision, recall, BLEU), đặc thù hình thái tiếng Nga, RAG.',
  r: [
    ['book', 'Лейн Х., Хапке Х., Ховард К. Обработка естественного языка в действии', '', 'ru', 'Bản dịch NLP in Action'],
    ['course', 'Voita L. NLP Course For You', 'https://lena-voita.github.io/nlp_course.html', 'en', 'Giải thích trực quan, tác giả gốc Nga'],
    ['course', 'ШАД Яндекса: NLP course (GitHub)', 'https://github.com/yandexdataschool/nlp_course', 'en', 'Bài giảng và bài tập'],
    ['tool', 'Stanza', 'https://stanfordnlp.github.io/stanza/', 'en', 'Phân tích nhiều ngôn ngữ, có tiếng Nga và tiếng Việt']
  ]
};
S.l_teaching = {
  vi: 'Phương pháp dạy ngoại ngữ (CLIL, TBLT)', ru: 'Методика преподавания языков', en: 'Language teaching methodology',
  tp: ['PPP', 'TBLT', 'CLIL', 'обратная связь', 'оценивание'], h: 4,
  qr: 'методика преподавания иностранных языков', qe: 'language teaching methodology TBLT CLIL', qz: '外语教学法',
  f: 'PPP, TBLT, CLIL; thiết kế bài học theo mục tiêu (backward design); đánh giá quá trình; sửa lỗi và phản hồi; phân hoá trình độ; công cụ số.',
  r: [
    ['book', 'Harmer J. The Practice of English Language Teaching', '', 'en', 'Giáo trình chuẩn'],
    ['book', 'Scrivener J. Learning Teaching', '', 'en', 'Thực hành lớp học'],
    ['book', 'Willis J. A Framework for Task-Based Learning', '', 'en', 'TBLT'],
    ['tool', 'Moodle', 'https://moodle.org', 'en', 'Hệ thống quản lý học tập'],
    ['tool', 'Kahoot!', 'https://kahoot.com', 'en', 'Câu đố trên lớp'],
    ['tool', 'Quizlet', 'https://quizlet.com', 'en', 'Thẻ từ'],
    ['tool', 'Wordwall', 'https://wordwall.net', 'en', 'Trò chơi luyện tập']
  ]
};
S.l_discourse = {
  vi: 'Phân tích diễn ngôn và truyền thông', ru: 'Дискурс и медиакоммуникация', en: 'Discourse and media communication',
  tp: ['дискурс-анализ', 'критическая лингвистика', 'нарратив', 'медиатексты'], h: 3,
  qr: 'дискурс-анализ лекции', qe: 'critical discourse analysis', qz: '话语分析',
  f: 'Diễn ngôn và văn bản, phân tích diễn ngôn phê phán (Fairclough, van Dijk), đóng khung trên truyền thông, mạch lạc và liên kết, phân tích nội dung mạng xã hội.',
  r: [
    ['book', 'Ван Дейк Т. А. Язык. Познание. Коммуникация', '', 'ru', 'Kinh điển'],
    ['book', 'Кибрик А. А. Анализ дискурса в когнитивной перспективе', '', 'ru', 'Chuyên khảo'],
    ['book', 'Fairclough N. Language and Power', '', 'en', 'Phân tích diễn ngôn phê phán'],
    ['book', 'Gee J. P. An Introduction to Discourse Analysis', '', 'en', 'Nhập môn']
  ]
};
})(window.KTT_DATA.subjects);

(function (S) {
S.r_method = {
  vi: 'Phương pháp luận nghiên cứu khoa học', ru: 'Методология научного исследования', en: 'Research methodology',
  tp: ['объект и предмет', 'гипотеза', 'планирование эксперимента', 'верификация и валидация', 'воспроизводимость'], h: 4, core: 1,
  qr: 'методология научного исследования лекция', qe: 'research methodology design of experiments', qz: '科研方法',
  f: 'Đối tượng và khách thể nghiên cứu, giả thuyết, tính mới và ý nghĩa thực tiễn theo chuẩn ВАК, thiết kế thí nghiệm (nhân tố, đối chứng), kiểm định thống kê, verification và validation, khả năng tái lập.',
  r: [
    ['book', 'Новиков А. М., Новиков Д. А. Методология научного исследования', '', 'ru', 'Giáo trình phổ biến'],
    ['book', 'Кузнецов И. Н. Диссертационные работы. Методика подготовки и оформления', '', 'ru', 'Thực hành viết luận án'],
    ['book', 'Адлер Ю. П., Маркова Е. В., Грановский Ю. В. Планирование эксперимента при поиске оптимальных условий', '', 'ru', 'Kinh điển thiết kế thí nghiệm'],
    ['book', 'Montgomery D. Design and Analysis of Experiments', '', 'en', 'Sách chuẩn'],
    ['site', 'NIST/SEMATECH e-Handbook of Statistical Methods', 'https://www.itl.nist.gov/div898/handbook/', 'en', 'Sổ tay thống kê, thiết kế thí nghiệm']
  ]
};
S.r_lit = {
  vi: 'Làm việc với tài liệu khoa học và trắc lượng khoa học', ru: 'Работа с научной литературой и наукометрия', en: 'Literature search and scientometrics',
  tp: ['поиск источников', 'обзор литературы', 'PRISMA', 'индекс Хирша', 'РИНЦ, Scopus, WoS', 'Zotero'], h: 3, core: 1,
  qr: 'как искать научную литературу обзор', qe: 'literature review how to search', qz: '文献检索',
  f: 'Chiến lược tìm (từ khoá, toán tử Boolean), lần theo trích dẫn, PRISMA cho tổng quan hệ thống, đánh giá chất lượng nguồn, chỉ số h, IF, quartile, РИНЦ và Белый список, quản lý tài liệu bằng Zotero.',
  r: [
    ['site', 'Google Scholar', 'https://scholar.google.com', 'en', 'Tìm bài báo, theo dõi trích dẫn'],
    ['site', 'Scopus', 'https://www.scopus.com', 'en', 'Cơ sở dữ liệu trích dẫn'],
    ['site', 'DOAJ: Directory of Open Access Journals', 'https://doaj.org', 'en', 'Tạp chí truy cập mở'],
    ['tool', 'Unpaywall', 'https://unpaywall.org', 'en', 'Tìm bản truy cập mở hợp pháp'],
    ['tool', 'ResearchRabbit', 'https://www.researchrabbit.ai', 'en', 'Bản đồ bài báo liên quan'],
    ['site', 'arXiv', 'https://arxiv.org', 'en', 'Bản thảo trước khi in'],
    ['journal', 'Remote Sensing of Environment', 'https://www.sciencedirect.com/journal/remote-sensing-of-environment', 'en', 'Q1, viễn thám'],
    ['journal', 'ISPRS Journal of Photogrammetry and Remote Sensing', 'https://www.sciencedirect.com/journal/isprs-journal-of-photogrammetry-and-remote-sensing', 'en', 'Q1, quang trắc và viễn thám'],
    ['journal', 'IEEE Transactions on Geoscience and Remote Sensing', 'https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=36', 'en', 'Q1, IEEE'],
    ['journal', 'Remote Sensing (MDPI)', 'https://www.mdpi.com/journal/remotesensing', 'en', 'Truy cập mở'],
    ['journal', 'Drones (MDPI)', 'https://www.mdpi.com/journal/drones', 'en', 'Truy cập mở, UAV'],
    ['journal', 'Sensors (MDPI)', 'https://www.mdpi.com/journal/sensors', 'en', 'Truy cập mở, cảm biến'],
    ['journal', 'International Journal of Computer Vision', 'https://link.springer.com/journal/11263', 'en', 'Thị giác máy tính'],
    ['journal', 'Journal of Machine Learning Research', 'https://www.jmlr.org', 'en', 'Học máy, truy cập mở'],
    ['journal', 'Journal of Computational Physics', 'https://www.sciencedirect.com/journal/journal-of-computational-physics', 'en', 'Vật lý tính toán'],
    ['journal', 'Acta Astronautica', 'https://www.sciencedirect.com/journal/acta-astronautica', 'en', 'Kỹ thuật vũ trụ'],
    ['journal', 'Journal of Guidance, Control, and Dynamics (AIAA)', 'https://arc.aiaa.org/journal/jgcd', 'en', 'Dẫn đường, điều khiển'],
    ['journal', 'ISPRS Archives', 'https://isprs-archives.copernicus.org', 'en', 'Kỷ yếu ISPRS, truy cập mở'],
    ['journal', 'Math-Net.Ru (tạp chí toán học Nga)', 'https://www.mathnet.ru', 'ru', 'Журнал вычислительной математики, Математическое моделирование và nhiều tạp chí khác'],
    ['journal', 'Современные проблемы дистанционного зондирования Земли из космоса (tìm trên КиберЛенинка)', 'https://cyberleninka.ru/search?q=%D0%A1%D0%BE%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%BF%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC%D1%8B%20%D0%B4%D0%B8%D1%81%D1%82%D0%B0%D0%BD%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D0%BE%D0%B3%D0%BE%20%D0%B7%D0%BE%D0%BD%D0%B4%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F', 'ru', 'Tạp chí ВАК của ИКИ РАН; liên kết tìm kiếm'],
    ['journal', 'Известия вузов. Геодезия и аэрофотосъёмка (tìm trên КиберЛенинка)', 'https://cyberleninka.ru/search?q=%D0%93%D0%B5%D0%BE%D0%B4%D0%B5%D0%B7%D0%B8%D1%8F%20%D0%B8%20%D0%B0%D1%8D%D1%80%D0%BE%D1%84%D0%BE%D1%82%D0%BE%D1%81%D1%8A%D0%B5%D0%BC%D0%BA%D0%B0', 'ru', 'Tạp chí của МИИГАиК; liên kết tìm kiếm'],
    ['journal', 'Исследование Земли из космоса (tìm trên Google Scholar)', 'https://scholar.google.com/scholar?q=%22%D0%98%D1%81%D1%81%D0%BB%D0%B5%D0%B4%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5+%D0%97%D0%B5%D0%BC%D0%BB%D0%B8+%D0%B8%D0%B7+%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D1%81%D0%B0%22', 'ru', 'Tạp chí của РАН; liên kết tìm kiếm']
  ]
};
S.r_pub = {
  vi: 'Viết bài báo, thuyết trình, phản biện', ru: 'Подготовка публикаций и презентаций', en: 'Scientific writing and presenting',
  tp: ['IMRaD', 'ответ рецензентам', 'LaTeX', 'постер', 'доклад на конференции'], h: 4, core: 1,
  qr: 'как написать научную статью', qe: 'how to write a scientific paper', qz: '科技论文写作',
  f: 'IMRaD, viết đúng yêu cầu tạp chí, trả lời phản biện (response letter), hình và bảng chuẩn xuất bản, LaTeX và BibTeX, poster và slide hội nghị 10–15 phút.',
  r: [
    ['book', 'Day R., Gastel B. How to Write and Publish a Scientific Paper', '', 'en', 'Kinh điển'],
    ['book', 'Pinker S. The Sense of Style', '', 'en', 'Văn phong rõ ràng'],
    ['tool', 'Overleaf: CV và mẫu bài báo', 'https://www.overleaf.com/gallery', 'en', 'Mẫu LaTeX của tạp chí'],
    ['tool', 'Inkscape', 'https://inkscape.org', 'en', 'Vẽ hình vector cho bài báo']
  ]
};
S.r_practice = {
  vi: 'Nghiên cứu dưới hướng dẫn, seminar, chuẩn bị luận án', ru: 'Научно-исследовательская работа и подготовка диссертации', en: 'Research practice and thesis',
  tp: ['план НИР', 'научный семинар', 'предзащита', 'автореферат', 'управление данными'], h: 3,
  qr: 'как написать диссертацию защита ВАК', qe: 'PhD thesis writing tips', qz: '博士论文 写作',
  f: 'Quy trình bảo vệ (предзащита, отзывы, автореферат), kế hoạch НИР, nhật ký thí nghiệm, trình bày tiến độ ở seminar, quản lý dữ liệu nghiên cứu.',
  r: [
    ['book', 'Райзберг Б. А. Диссертация и учёная степень', '', 'ru', 'Sổ tay cho nghiên cứu sinh'],
    ['site', 'ВАК при Минобрнауки России', 'https://vak.minobrnauki.gov.ru', 'ru', 'Quy định, danh mục tạp chí'],
    ['site', 'Белый список научных журналов (РЦНИ)', 'https://journalrank.rcsi.science/ru/', 'ru', 'Cấp hạng tạp chí']
  ]
};
S.r_pedagogy = {
  vi: 'Thực tập giảng dạy', ru: 'Педагогическая практика', en: 'Teaching practice',
  tp: ['таксономия Блума', 'активное обучение', 'оценивание', 'методические материалы'], h: 2,
  qr: 'педагогика высшей школы лекции', qe: 'university teaching active learning', qz: '高校教学法',
  f: 'Thiết kế seminar và buổi thực hành, mục tiêu học tập theo Bloom, đánh giá và tiêu chí chấm, học chủ động, soạn tài liệu phương pháp.',
  r: [
    ['book', 'Смирнов С. Д. Педагогика и психология высшего образования', '', 'ru', 'Giáo trình'],
    ['book', 'Biggs J., Tang C. Teaching for Quality Learning at University', '', 'en', 'Thiết kế khoá học đại học']
  ]
};
S.r_grants = {
  vi: 'Xin tài trợ và quản lý dự án', ru: 'Грантовая деятельность и управление проектами', en: 'Grants and project management',
  tp: ['заявка', 'бюджет', 'план-график', 'отчётность', 'РНФ', 'NAFOSTED'], h: 2,
  qr: 'как написать грантовую заявку РНФ', qe: 'how to write a grant proposal', qz: '基金申请书 写作',
  f: 'Cấu trúc hồ sơ (vấn đề, mục tiêu, phương pháp, kết quả dự kiến, ngân sách), kế hoạch Gantt, quản lý rủi ro, báo cáo; quỹ ở Nga (РНФ, Фонд содействия инновациям) và Việt Nam (NAFOSTED).',
  r: [
    ['site', 'NAFOSTED (Quỹ Phát triển KH&CN Quốc gia)', 'https://nafosted.gov.vn', 'vi', 'Quỹ khoa học của Việt Nam']
  ]
};
S.i_cv = {
  vi: 'CV, thư xin việc, hồ sơ trực tuyến', ru: 'Резюме и сопроводительное письмо', en: 'CV and cover letter',
  tp: ['резюме', 'сопроводительное письмо', 'ORCID', 'GitHub-профиль', 'публикации'], h: 4, core: 1,
  qr: 'как составить резюме для IT и науки', qe: 'how to write a CV for data science', qz: '简历 写作',
  f: 'CV 1–2 trang viết riêng cho từng vị trí, thành tích định lượng (ví dụ «nâng độ chính xác tổng thể từ 82% lên 91%»), danh sách công bố có DOI, link GitHub và ORCID, thư xin việc ngắn gọn theo từng công ty.',
  r: [
    ['tool', 'Overleaf: mẫu CV', 'https://www.overleaf.com/gallery/tagged/cv', 'en', 'Mẫu CV LaTeX'],
    ['site', 'ORCID', 'https://orcid.org', 'en', 'Mã định danh nhà khoa học'],
    ['site', 'GitHub: Managing your profile README', 'https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme', 'en', 'Trang giới thiệu trên GitHub']
  ]
};
S.i_tech = {
  vi: 'Phỏng vấn kỹ thuật: thuật toán, ML, thiết kế hệ thống', ru: 'Техническое собеседование', en: 'Technical interview',
  tp: ['live coding', 'теория ML', 'ML system design', 'разбор проекта'], h: 10, core: 1,
  qr: 'собеседование data scientist ML engineer mock', qe: 'machine learning interview mock', qz: '机器学习 面试',
  f: 'Lập trình trực tiếp (LeetCode dễ và trung bình), câu hỏi lý thuyết ML và DL, thiết kế hệ thống ML (ví dụ pipeline dữ liệu vệ tinh), trình bày sâu dự án: vì sao chọn mô hình này, đánh giá thế nào, làm lại sẽ khác gì.',
  r: [
    ['book', 'Макдауэлл Г. Карьера программиста (Cracking the Coding Interview)', '', 'ru', 'Bản dịch'],
    ['book', 'Сюй А. System Design. Подготовка к сложному интервью', '', 'ru', 'Bản dịch của Alex Xu']
  ]
};
S.i_behav = {
  vi: 'Phỏng vấn hành vi (STAR), kỹ năng mềm', ru: 'Поведенческое интервью (STAR)', en: 'Behavioral interview (STAR)',
  tp: ['метод STAR', 'конфликты', 'неудачи', 'лидерство', 'вопросы работодателю', 'обсуждение зарплаты'], h: 3, core: 1,
  qr: 'поведенческое интервью STAR вопросы', qe: 'behavioral interview STAR method', qz: '行为面试 STAR',
  f: 'Phương pháp STAR (tình huống, nhiệm vụ, hành động, kết quả), chuẩn bị 6–8 câu chuyện về xung đột, thất bại, dẫn dắt, làm việc nhóm đa văn hoá; câu «vì sao chọn công ty chúng tôi»; câu hỏi ngược cho nhà tuyển dụng; trao đổi về lương.'
  , r: []
};
S.i_jobs = {
  vi: 'Tìm việc và nhà tuyển dụng', ru: 'Поиск вакансий и работодатели', en: 'Job search and employers',
  tp: ['hh.ru', 'Хабр Карьера', 'networking', 'рекомендации', 'работодатели ДЗЗ/ГИС/БПЛА'], h: 3, core: 1,
  qr: 'вакансии ГИС ДЗЗ специалист', qe: 'remote sensing GIS jobs', qz: '遥感 GIS 招聘',
  f: 'Lập danh sách 20–30 nhà tuyển dụng mục tiêu, theo dõi vị trí, networking (hội nghị, cộng đồng ODS, GIS-Lab), xin giới thiệu nội bộ.',
  r: [
    ['job', 'TopCV', 'https://www.topcv.vn', 'vi', 'Việc làm ở Việt Nam'],
    ['job', 'ITviec', 'https://itviec.com', 'vi', 'Việc làm IT ở Việt Nam'],
    ['job', 'VietnamWorks', 'https://www.vietnamworks.com', 'vi', 'Việc làm ở Việt Nam'],
    ['site', 'Роскосмос', 'https://www.roscosmos.ru', 'ru', 'Tập đoàn vũ trụ Nga'],
    ['site', 'ИКИ РАН (Институт космических исследований)', 'https://iki.cosmos.ru', 'ru', 'Viện nghiên cứu vũ trụ'],
    ['site', 'Совзонд', 'https://sovzond.ru', 'ru', 'Công ty viễn thám, GIS'],
    ['site', 'СКАНЭКС', 'https://www.scanex.ru', 'ru', 'Công ty viễn thám'],
    ['site', 'Геоскан', 'https://www.geoscan.ru', 'ru', 'UAV, quang trắc'],
    ['site', 'NextGIS', 'https://nextgis.ru', 'ru', 'GIS mã nguồn mở'],
    ['site', 'Яндекс: вакансии', 'https://yandex.ru/jobs/', 'ru', 'ML, thị giác máy tính, bản đồ'],
    ['site', 'Trung tâm Vũ trụ Việt Nam (VNSC)', 'https://vnsc.org.vn', 'vi', 'Vệ tinh, viễn thám ở Việt Nam']
  ]
};
S.i_portfolio = {
  vi: 'Dự án portfolio', ru: 'Проекты для портфолио', en: 'Portfolio projects',
  tp: ['изменения землепользования по Sentinel-2', 'БПЛА → ортофотоплан → сегментация', 'детекция объектов на снимках', 'демо и README'], h: 12, core: 1,
  qr: 'проекты портфолио data science ДЗЗ', qe: 'remote sensing deep learning project portfolio', qz: '遥感 深度学习 项目',
  f: 'Ba dự án mẫu: (1) phát hiện biến động lớp phủ từ Sentinel-2 kèm dashboard; (2) UAV: ảnh, ảnh trực giao bằng ODM, phân đoạn đối tượng; (3) phát hiện đối tượng trên ảnh vệ tinh (DOTA, xView) và triển khai ONNX. Mỗi dự án có README, kết quả định lượng, bản demo.',
  r: [
    ['site', 'GitHub Pages', 'https://pages.github.com', 'en', 'Trang web miễn phí cho portfolio'],
    ['tool', 'Hugging Face Spaces', 'https://huggingface.co/spaces', 'en', 'Đăng demo mô hình'],
    ['tool', 'Streamlit', 'https://streamlit.io', 'en', 'Dashboard nhanh bằng Python'],
    ['practice', 'Kaggle Competitions', 'https://www.kaggle.com/competitions', 'en', 'Cuộc thi dữ liệu'],
    ['data', 'EuroSAT', 'https://github.com/phelber/EuroSAT', 'en', 'Phân loại cảnh Sentinel-2'],
    ['data', 'BigEarthNet', 'https://bigearth.net', 'en', 'Sentinel-1/2 đa nhãn'],
    ['data', 'SpaceNet', 'https://spacenet.ai', 'en', 'Nhà, đường từ ảnh vệ tinh'],
    ['data', 'xView', 'https://xviewdataset.org', 'en', 'Phát hiện đối tượng'],
    ['data', 'DOTA', 'https://captain-whu.github.io/DOTA/', 'en', 'Đối tượng xoay trong ảnh hàng không'],
    ['data', 'LoveDA', 'https://github.com/Junjue-Wang/LoveDA', 'en', 'Phân đoạn lớp phủ đô thị và nông thôn']
  ]
};
})(window.KTT_DATA.subjects);

