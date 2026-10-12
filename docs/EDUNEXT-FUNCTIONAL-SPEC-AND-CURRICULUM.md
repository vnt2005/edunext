# EduNext — Đặc tả chức năng dành cho người dùng và danh mục chương trình học

**Phiên bản:** 1.0  
**Mục đích tài liệu:** Làm nguồn chuẩn để rà soát, thiết kế và sửa các chức năng người dùng của EduNext.  
**Phạm vi:** Website khám phá/bán khóa học và trải nghiệm học viên; danh mục khởi đầu gồm 50 lĩnh vực, 100 khóa học đề xuất và 800 mục bài học trong khung chương trình.

---

## 1. Định hướng sản phẩm

EduNext là website hướng người dùng, tập trung vào khám phá lĩnh vực, tìm hiểu và mua khóa học, học theo lộ trình, lưu tiến độ và nhận chứng chỉ. Giao diện cần thống nhất, dễ hiểu, dễ sử dụng và hoạt động tốt trên máy tính, máy tính bảng và điện thoại.

### 1.1 Phạm vi bao gồm

- Website công khai và trang chủ giới thiệu khóa học.
- Danh mục lĩnh vực phân cấp, lĩnh vực chuyên môn liên quan và danh sách khóa học theo lĩnh vực.
- Chi tiết khóa học, lộ trình/chương, bài học và học liệu.
- Đăng ký, đăng nhập, đăng xuất, hồ sơ cá nhân và cài đặt tài khoản cần thiết cho học viên.
- Luồng mua khóa học, trạng thái đơn hàng/thanh toán và quyền truy cập khóa học.
- Khu vực học viên: khóa học đã mua, tiến độ học tập, bài học, lịch sử mua hàng và chứng chỉ.
- Blog, trang giới thiệu, FAQ và các đường dẫn liên hệ.
- Điều hướng, trạng thái tải/lỗi, khả năng tiếp cận và responsive.

### 1.2 Ngoài phạm vi

- Không xây dựng dashboard quản trị riêng trong giao diện công khai.
- Không xây dựng khu vực giảng viên, trang “Giảng dạy”, “Course Builder”, “Quản lý khóa học” hoặc workspace riêng cho người dạy.
- Không tự ý tạo thêm các vai trò hoặc cổng quản lý ngoài phạm vi người dùng/học viên.
- Không tạo nút giả, số liệu giả hoặc tuyên bố giao dịch thật khi chưa có tích hợp thực tế.
- Không tự ý thêm quiz mới hoặc thay đổi điều kiện hoàn thành khóa học đã thống nhất mà chưa cập nhật tài liệu này.

Việc cấu hình nội dung WordPress ở phía sau không phải lý do để tạo thêm một giao diện quản trị mới dành cho người dùng website.

---

## 2. Cấu trúc điều hướng chính

Thanh điều hướng công khai nên gọn, dễ hiểu và không có mục trùng lặp:

- **Trang chủ** — giới thiệu EduNext, khóa học nổi bật và các lối khám phá.
- **Khóa học / Khám phá** — xem danh sách toàn bộ khóa học, tìm kiếm, lọc và sắp xếp.
- **Lĩnh vực** — khám phá hệ thống 50 lĩnh vực ban đầu và các lĩnh vực chuyên môn con.
- **Góc kiến thức** — danh sách và nội dung bài viết blog.
- **Hỏi đáp** — câu hỏi thường gặp.
- **Hồ sơ / Tài khoản** — chỉ hiển thị khi người dùng đã đăng nhập; bấm vào hồ sơ sẽ mở thẳng trang hồ sơ, không cần chọn menu phụ.

Các liên kết khác như khóa học đã mua, trang học tập, chứng chỉ, đăng nhập/đăng ký có thể hiển thị theo trạng thái đăng nhập. Không đưa mục “Contact” lên thanh điều hướng chính; cung cấp các biểu tượng Zalo, Facebook, điện thoại với đường dẫn/cấu hình thật ở khu vực liên hệ.

---

## 3. Đặc tả chức năng người dùng

### 3.1 Trang chủ

1. Giới thiệu rõ EduNext và giá trị của việc học theo lộ trình.
2. Hiển thị một số khóa học nổi bật; **sáu khóa trên trang chủ chỉ là số hiển thị gợi ý, không phải giới hạn tổng khóa học**.
3. Có liên kết “Xem tất cả khóa học”.
4. Hiển thị lĩnh vực chính và chủ đề chuyên môn; mỗi mục phải bấm được và mở đúng danh sách tương ứng.
5. Có các phần giới thiệu lộ trình, giảng viên/đội ngũ giới thiệu, đánh giá, thống kê, blog, FAQ và lời kêu gọi khám phá khóa học khi có nội dung phù hợp.
6. Giữ một ô tìm kiếm chính trên đầu trang; không tạo thanh tìm kiếm trùng lặp không cần thiết.
7. Không được mất toàn bộ nội dung hoặc chỉ còn footer khi có lỗi JavaScript hay dữ liệu.

### 3.2 Khám phá khóa học

1. Hiển thị toàn bộ khóa học đã xuất bản, không dừng ở sáu khóa.
2. Hỗ trợ tìm theo tên khóa học và các trường phù hợp như lĩnh vực, mô tả hoặc cấp độ.
3. Hỗ trợ lọc theo lĩnh vực chính, lĩnh vực chuyên môn, cấp độ và tiêu chí đang có dữ liệu.
4. Hỗ trợ sắp xếp theo tiêu chí được công bố, chẳng hạn tên hoặc giá; chỉ thêm mức độ phổ biến/đánh giá khi có dữ liệu đáng tin cậy.
5. Dùng phân trang hoặc nút “Xem thêm” khi danh sách dài; trạng thái bộ lọc phải rõ ràng và có thể xóa.
6. Mọi thẻ khóa học và kết quả tìm kiếm phải mở đúng trang chi tiết.
7. Khi không có kết quả, hiển thị trạng thái rỗng dễ hiểu và cách xóa bộ lọc.

### 3.3 Hệ thống lĩnh vực và chủ đề liên quan

1. Khởi đầu với 50 lĩnh vực chính được liệt kê trong tài liệu này; đây không phải giới hạn vĩnh viễn.
2. Mỗi lĩnh vực có mô tả, slug/định danh ổn định và danh sách lĩnh vực chuyên môn con.
3. Có thể biểu diễn cấu trúc cha–con, ví dụ: **Công nghệ thông tin → Phát triển Web → Backend → ASP.NET Core**.
4. Mỗi khóa học có một lĩnh vực chính và có thể gắn nhiều lĩnh vực/chủ đề chuyên môn liên quan.
5. Bấm vào lĩnh vực hoặc chủ đề liên quan sẽ mở danh sách khóa học được liên kết với mục đó; không chỉ hiển thị một nhãn trang trí.
6. Mục “lĩnh vực liên quan” trên trang chi tiết là những **lĩnh vực/chủ đề**, không bị thay thế bằng một danh sách “khóa học tương tự”.
7. Không nhân đôi danh mục do khác cách viết; cần chuẩn hóa tên, slug và mối quan hệ.
8. Có thể mở rộng danh mục và thêm khóa học mà không phải sửa lại cấu trúc giao diện cho từng lĩnh vực mới.

### 3.4 Trang chi tiết khóa học

Mỗi khóa học cần có:

- Tên, hình ảnh/ảnh bìa, mô tả ngắn và mô tả đầy đủ.
- Lĩnh vực chính và các lĩnh vực chuyên môn liên quan có thể bấm.
- Đối tượng phù hợp, kiến thức đầu vào, mục tiêu/kết quả học tập.
- Cấp độ, thời lượng dự kiến, chương trình học đầy đủ và số lượng bài học thực tế.
- Thông tin người hướng dẫn nếu có dữ liệu hợp lệ; không tạo trang “Giảng dạy” cho người hướng dẫn.
- Giá và ưu đãi nếu có; trạng thái sở hữu khóa học.
- Nút xem trước khi video xem trước có sẵn.
- Nút mua/đăng ký nếu chưa sở hữu; nút tiếp tục học nếu đã có quyền học.
- Các lĩnh vực liên quan được dùng để khám phá thêm; không yêu cầu tạo khối “khóa học tương tự” nếu không cần thiết.

### 3.5 Tài khoản và hồ sơ

1. Đăng ký với xác thực dữ liệu đầu vào và phản hồi lỗi rõ ràng.
2. Đăng nhập/đăng xuất; không điều hướng sai hoặc giữ phiên đăng nhập không mong muốn.
3. Có luồng đặt lại mật khẩu nếu hệ thống xác thực thực tế hỗ trợ.
4. Xem và cập nhật họ tên, ảnh đại diện và thông tin hồ sơ cơ bản.
5. Nếu có cài đặt bảo mật/quyền riêng tư/thông báo, các lựa chọn phải mô tả đúng phạm vi được triển khai. Không trình bày tính năng mô phỏng như tính năng thật.
6. Nút/hình đại diện hồ sơ trên header mở trực tiếp trang hồ sơ; không có khung hồ sơ thừa, mũi tên hoặc menu trung gian không cần thiết.
7. Bảo vệ trang học tập, bài học, giao dịch và chứng chỉ theo trạng thái đăng nhập.

### 3.6 Mua khóa học và thanh toán

1. Người dùng xem lại khóa học, giá, ưu đãi và tổng tiền trước khi xác nhận.
2. Đơn hàng phải liên kết đúng tài khoản, khóa học, số tiền, thời điểm và trạng thái.
3. Trạng thái thanh toán cần phân biệt ít nhất các trạng thái thực tế mà tích hợp hỗ trợ, ví dụ chờ thanh toán, thành công, thất bại hoặc đã hoàn/hủy nếu có.
4. Chỉ cấp quyền học sau khi hệ thống xác nhận thanh toán thành công theo cơ chế thực tế.
5. Không ghi nhận giao dịch thật chỉ vì người dùng bấm nút trong bản demo; nếu chưa tích hợp cổng thanh toán thì phải ghi rõ đó là demo và không giả lập số liệu doanh thu thật.
6. Nếu người dùng đã sở hữu khóa học, không tạo đơn mua trùng không cần thiết; dẫn họ tới trang học.
7. Có trang lịch sử mua hàng/đơn hàng của chính người dùng, với trạng thái dễ hiểu.
8. Không lưu thông tin thẻ nhạy cảm trong localStorage hoặc nơi lưu trữ phía trình duyệt.

### 3.7 Trang học tập của học viên

1. Dashboard tập trung vào người học, không phải bảng điều khiển quản trị.
2. Hiển thị khóa học đã mua, khóa đang học, khóa hoàn thành và tiến độ.
3. Có hành động “Tiếp tục học” dẫn đến bài chưa hoàn thành gần nhất.
4. Thể hiện rõ trạng thái rỗng khi chưa mua khóa học.
5. Hiển thị số bài đã hoàn thành dựa trên tiến độ thực tế.
6. Có lối truy cập đến chứng chỉ và lịch sử đơn hàng.
7. Không hiển thị các mục “Giảng dạy”, “Course Builder”, “Quản lý khóa học” hay workspace dành cho người dạy.

### 3.8 Bài học và tiến độ

1. Mỗi khóa học phải có chương trình học theo đúng thứ tự từ kiến thức nền tảng đến nội dung chuyên môn, thực hành và tổng kết/dự án cuối khóa.
2. Tám bài trong danh mục bên dưới là khung chương trình khởi đầu cho mỗi khóa; **không phải giới hạn số bài**. Khi một môn cần nhiều bài hơn để dạy đầy đủ, phải bổ sung bài học chứ không cắt nội dung để cố định số lượng.
3. Mỗi bài học có tiêu đề, nội dung/học liệu, video riêng hoặc phương tiện giảng dạy riêng, bài tập/thực hành nếu phù hợp và tiêu chí hoàn thành.
4. Không dùng một video cho nhiều bài khác nhau để giả lập một chương trình học đầy đủ. Không gán video chỉ vì có ID; cần xác minh video đúng nội dung và có quyền sử dụng.
5. Có danh sách bài học, trạng thái từng bài, điều hướng bài trước/bài sau và tiến độ toàn khóa.
6. Chức năng đánh dấu đã đọc/đã học cần lưu trạng thái cho đúng người dùng, khóa học và bài học.
7. Quy tắc đã thống nhất cho phiên bản hiện tại: khi dùng cơ chế hoàn thành theo 5 bài, người học cần đánh dấu hoàn thành 5 bài để đạt điều kiện tương ứng. Tuy nhiên, với danh mục chương trình mới có 8 bài trở lên, cần cấu hình điều kiện hoàn thành theo số bài/điều kiện thực tế của chính khóa học; không mặc định toàn bộ khóa học chỉ có 5 bài.
8. Không tự ý tạo hoặc thêm một trang quiz riêng khi chưa nằm trong phạm vi được thống nhất. Nếu một khóa học thực sự có bài kiểm tra, điều kiện và điểm đạt phải được công bố cho khóa học đó.

### 3.9 Chứng chỉ

1. Hiển thị danh sách chứng chỉ mà người dùng thực sự đủ điều kiện nhận.
2. Chỉ cho xem/cấp chứng chỉ khi hoàn thành các điều kiện đã công bố cho khóa học.
3. Hiển thị tên người học, tên khóa học, ngày cấp và mã chứng chỉ khi được hệ thống hỗ trợ.
4. Cho phép in hoặc lưu thành PDF qua chức năng in của trình duyệt nếu chưa có hệ thống tạo PDF chuyên biệt.
5. Không tạo chứng chỉ với dữ liệu chưa hoàn thành hoặc dùng mã giả để ngụ ý tính xác thực bên ngoài.

### 3.10 Blog, giới thiệu, FAQ và liên hệ

1. Trang blog hiển thị danh sách bài viết với tiêu đề, chủ đề, đoạn giới thiệu và nội dung đọc được.
2. Bộ lọc chủ đề blog phải hoạt động thực sự; nút không liên quan đến chức năng thì không hiển thị như bộ lọc.
3. Các bài viết/đường dẫn phải mở đúng nội dung, không dẫn tất cả về cùng một trang giả.
4. Có trang giới thiệu và FAQ với điều hướng rõ ràng.
5. Hiển thị biểu tượng Zalo, Facebook và điện thoại ở khu vực liên hệ nếu có URL/số điện thoại thật được cấu hình; không tự bịa thông tin liên hệ.
6. Có trang lỗi/ trạng thái trống thân thiện khi bài viết không tồn tại.

### 3.11 Giao diện và điều hướng

- Dùng một hệ thống header, footer, màu sắc, kiểu chữ, khoảng cách và thành phần giao diện nhất quán.
- Các nút danh mục, lọc, tìm kiếm, hồ sơ, chứng chỉ và bài học phải bấm được và có kết quả tương ứng.
- Không để chữ quá nhỏ, thẻ bị tràn, nội dung chồng lấn, thanh điều hướng bị che hoặc footer thiếu các liên kết chính.
- Responsive tối thiểu cho màn hình điện thoại hẹp, tablet và desktop.
- Cung cấp trạng thái tải, không có dữ liệu, thành công và lỗi bằng thông báo rõ ràng.
- Dùng ngữ nghĩa HTML, nhãn biểu mẫu, trạng thái focus và độ tương phản đủ đọc.
- Tránh lỗi JavaScript làm trang trắng; kiểm tra cả điều hướng trực tiếp bằng URL/hash và tải lại trang.
- Chế độ sáng/tối chỉ hiển thị nếu được triển khai đầy đủ; màu sắc và modal phải nhất quán giữa các trang hỗ trợ.

---

## 4. Quy tắc dữ liệu và quan hệ chức năng

Các khái niệm dữ liệu cần được liên kết rõ ràng, dù cách lưu có thể phụ thuộc kiến trúc WordPress hiện có:

- **Người dùng:** định danh, thông tin hồ sơ và trạng thái xác thực.
- **Lĩnh vực:** tên, slug, mô tả và lĩnh vực cha nếu là mục con.
- **Chủ đề chuyên môn:** liên kết tới lĩnh vực cha; có thể được dùng làm tag/chủ đề khám phá.
- **Khóa học:** tiêu đề, slug, mô tả, lĩnh vực chính, lĩnh vực liên quan, giá, cấp độ, thời lượng, ảnh bìa và trạng thái xuất bản.
- **Chương/bài học:** khóa học sở hữu, thứ tự, tiêu đề, nội dung, video/học liệu, bài tập và điều kiện hoàn thành.
- **Tiến độ:** người dùng, khóa học, các bài đã hoàn thành, phần trăm và thời điểm cập nhật.
- **Đơn hàng/giao dịch:** người dùng, khóa học, giá tại thời điểm mua, trạng thái và dữ liệu xác nhận thanh toán.
- **Chứng chỉ:** người học, khóa học, điều kiện hoàn thành, ngày cấp và mã chứng chỉ nếu hợp lệ.
- **Bài viết:** tiêu đề, nội dung, chủ đề, ảnh và trạng thái xuất bản.

Tên lĩnh vực, khóa học và bài học phải có định danh ổn định để các liên kết không bị hỏng khi đổi tiêu đề. Tiến độ, đơn hàng và chứng chỉ phải gắn với đúng người dùng; không dùng dữ liệu demo cục bộ để tuyên bố có xác thực hoặc thanh toán an toàn thật.

---

## 5. Tiêu chí nghiệm thu tổng thể

### Ưu tiên P1 — các luồng cốt lõi

- [ ] Người chưa đăng nhập có thể khám phá lĩnh vực và xem chi tiết khóa học.
- [ ] Tìm kiếm, bộ lọc, nút lĩnh vực và liên kết khóa học hoạt động.
- [ ] Đăng ký/đăng nhập/đăng xuất phản hồi đúng; trang riêng tư có bảo vệ phù hợp.
- [ ] Mua khóa học hiển thị rõ trạng thái demo/thật; không cấp quyền sai.
- [ ] Học viên thấy đúng các khóa được sở hữu và có thể mở đúng bài.
- [ ] Video và nội dung bài học khớp với tiêu đề; tiến độ lưu đúng người dùng.
- [ ] Quy tắc hoàn thành và chứng chỉ hoạt động chính xác.

### Ưu tiên P2 — trải nghiệm giao diện

- [ ] Trang chủ có các section dự kiến và chỉ dùng số khóa nổi bật làm số hiển thị, không giới hạn danh mục tổng.
- [ ] Danh mục 50 lĩnh vực có thể mở rộng; lĩnh vực/chủ đề liên quan có thể bấm.
- [ ] Hồ sơ trên header mở thẳng trang hồ sơ.
- [ ] Blog, FAQ, giới thiệu và liên hệ mở đúng nội dung.
- [ ] Header, chữ, footer, card, modal và menu không chồng lấn hay biến mất.
- [ ] Responsive được kiểm thử trên desktop/tablet/mobile.

### Ưu tiên P3 — dữ liệu và hoàn thiện

- [ ] Dữ liệu demo được phân biệt với dữ liệu thực.
- [ ] Không có đường dẫn chết, nút giả, nội dung lặp hoặc dữ liệu không nhất quán.
- [ ] Có trạng thái lỗi và rỗng cho các trang/luồng chính.
- [ ] Có thể thêm lĩnh vực, khóa học và bài học bằng dữ liệu/cấu hình mà không phải xây lại giao diện mỗi lần.

---

## 6. Danh mục chương trình học

Danh mục dưới đây đưa ra **50 lĩnh vực chính, 100 khóa học khởi đầu và 8 mục bài học cho mỗi khóa trong khung chương trình**. Đây là bản đồ nội dung/đề cương để xây dựng hệ thống, không phải khẳng định 800 video, tài liệu hay bài giảng hoàn chỉnh đã tồn tại. Mỗi khóa học phải được bổ sung nội dung giảng dạy thực tế và số bài cần thiết để dạy trọn vẹn chủ đề.

## Tổng quan lĩnh vực

1. **Lập trình và phát triển phần mềm** — C#, Java, Python, C/C++, OOP, cấu trúc dữ liệu, thuật toán, Git
2. **Phát triển Web** — HTML, CSS, JavaScript, TypeScript, React, Vue, Node.js, ASP.NET Core, REST API
3. **Phát triển ứng dụng di động** — Android, iOS, Kotlin, Swift, Flutter, React Native, UI di động
4. **Cơ sở dữ liệu** — SQL Server, MySQL, PostgreSQL, MongoDB, mô hình dữ liệu, tối ưu truy vấn
5. **AI và Machine Learning** — Machine Learning, Generative AI, LLM, NLP, Computer Vision, AI Agents
6. **Khoa học dữ liệu và phân tích dữ liệu** — Excel, SQL, Power BI, Tableau, Python, thống kê, trực quan hóa
7. **An ninh mạng** — Bảo mật mạng, bảo mật Web, ethical hacking, pentest, bảo vệ tài khoản
8. **Mạng máy tính và hệ thống** — TCP/IP, Cisco, Linux, Windows Server, quản trị mạng, DNS, DHCP
9. **Cloud Computing và DevOps** — AWS, Azure, Google Cloud, Docker, Kubernetes, CI/CD, Terraform
10. **Kiểm thử phần mềm** — Manual testing, test case, API testing, automation, Selenium, Playwright, QA/QC
11. **Kiến trúc và thiết kế phần mềm** — Clean Architecture, design patterns, SOLID, microservices, distributed systems
12. **Phát triển game** — Unity, Unreal Engine, gameplay, C#, đồ họa 3D, game design
13. **Blockchain và Web3** — Blockchain, Solidity, smart contracts, dApps, ví số, Web3
14. **IoT và hệ thống nhúng** — Arduino, ESP32, Raspberry Pi, C/C++, cảm biến, IoT, robotics
15. **UI/UX và thiết kế sản phẩm số** — Figma, user research, wireframe, prototype, design system, accessibility
16. **Thiết kế đồ họa** — Photoshop, Illustrator, InDesign, branding, layout, quảng cáo
17. **Thiết kế 3D và kiến trúc** — Blender, 3ds Max, SketchUp, AutoCAD, dựng hình, diễn họa kiến trúc
18. **Nhiếp ảnh** — Ảnh chân dung, sản phẩm, phong cảnh, ánh sáng, bố cục, chỉnh sửa ảnh
19. **Video và sản xuất nội dung** — Premiere Pro, DaVinci Resolve, After Effects, dựng phim, âm thanh, motion graphics
20. **Sáng tạo nội dung số** — YouTube, TikTok, podcast, kịch bản, lịch nội dung, phát triển kênh
21. **Digital Marketing** — SEO, SEM, Google Ads, Facebook Ads, social media, analytics
22. **Content Marketing và Copywriting** — SEO copywriting, bài blog, landing page, email, storytelling, nội dung thương hiệu
23. **Kinh doanh và bán hàng** — Sales, B2B, B2C, tư vấn khách hàng, đàm phán, chăm sóc khách hàng
24. **Thương mại điện tử** — Cửa hàng trực tuyến, marketplace, quản lý sản phẩm, vận hành đơn, CRO
25. **Quản trị doanh nghiệp** — Chiến lược, vận hành, quy trình, tổ chức, quản lý hiệu suất
26. **Quản lý dự án** — Agile, Scrum, Kanban, lập kế hoạch, rủi ro, Jira, stakeholder
27. **Tài chính và đầu tư** — Tài chính cá nhân, ngân sách, phân tích tài chính, định giá, quản lý rủi ro
28. **Kế toán và kiểm toán** — Kế toán cơ bản, sổ sách, báo cáo tài chính, thuế, kiểm soát nội bộ
29. **Nhân sự** — Tuyển dụng, onboarding, đào tạo, C&B, hiệu suất, văn hóa doanh nghiệp
30. **Logistics và chuỗi cung ứng** — Kho vận, vận tải, xuất nhập khẩu, mua hàng, tồn kho, hoạch định nhu cầu
31. **Tiếng Anh** — Giao tiếp, IELTS, TOEIC, tiếng Anh thương mại, tiếng Anh IT
32. **Ngoại ngữ khác** — Tiếng Nhật, Hàn, Trung, Pháp, Đức và giao tiếp đa ngôn ngữ
33. **Giáo dục và đào tạo** — Thiết kế bài giảng, phương pháp sư phạm, đào tạo trực tuyến, đánh giá học tập
34. **Kỹ năng mềm** — Giao tiếp, thuyết trình, tư duy phản biện, làm việc nhóm, giải quyết xung đột
35. **Năng suất và phát triển cá nhân** — Quản lý thời gian, thói quen, mục tiêu, ghi chú, tư duy cá nhân
36. **Tin học văn phòng** — Word, Excel, PowerPoint, Google Workspace, bảng tính và tài liệu
37. **Phân tích nghiệp vụ** — Business Analysis, yêu cầu, BPMN, UML, stakeholder, user story
38. **Khoa học và Toán học** — Toán ứng dụng, logic, đại số, xác suất, thống kê, mô hình hóa
39. **Kỹ thuật và công nghệ** — Điện, điện tử, tự động hóa, CAD/CAM, cơ khí, đo lường
40. **Khởi nghiệp** — Ý tưởng kinh doanh, mô hình kinh doanh, thị trường, MVP, gọi vốn
41. **Âm nhạc** — Piano, guitar, thanh nhạc, nhạc lý, hòa âm, sản xuất âm nhạc
42. **Mỹ thuật và minh họa** — Vẽ cơ bản, digital painting, concept art, màu sắc, minh họa sách
43. **Thời trang** — Thiết kế trang phục, phối đồ, may mặc, rập, chất liệu, thương hiệu thời trang
44. **Nấu ăn và ẩm thực** — Món Việt, kỹ thuật bếp, làm bánh, pha chế, vệ sinh thực phẩm
45. **Sức khỏe và thể chất** — Thể hình, yoga, vận động, dinh dưỡng cơ bản, thói quen lành mạnh
46. **Làm đẹp** — Chăm sóc da, trang điểm, tạo mẫu tóc, chăm sóc móng, vệ sinh dụng cụ
47. **Bất động sản** — Môi giới, định giá, đầu tư, marketing dự án, quản lý tài sản
48. **Pháp luật và tuân thủ** — Pháp luật kinh doanh, hợp đồng, sở hữu trí tuệ, quyền riêng tư, tuân thủ
49. **Nông nghiệp và môi trường** — Nông nghiệp công nghệ cao, trồng trọt, thủy canh, đất, nước, bền vững
50. **Du lịch và dịch vụ** — Quản trị khách sạn, nhà hàng, điều hành tour, hướng dẫn du lịch, chăm sóc khách

---

# Chương trình chi tiết

## 1. Lập trình và phát triển phần mềm

**Lĩnh vực chuyên môn liên quan:** C#, Java, Python, C/C++, OOP, cấu trúc dữ liệu, thuật toán, Git

### Khóa 1.1: C# từ cơ bản đến xây dựng ứng dụng

| Bài | Tên bài học |
|---:|---|
| 1 | Làm quen .NET, Visual Studio và cấu trúc chương trình C# |
| 2 | Biến, kiểu dữ liệu, toán tử và chuyển đổi kiểu |
| 3 | Điều kiện, vòng lặp và xử lý nhập liệu |
| 4 | Phương thức, tham số, giá trị trả về và phạm vi biến |
| 5 | Mảng, List, Dictionary và xử lý chuỗi |
| 6 | Lập trình hướng đối tượng: class, object, đóng gói |
| 7 | Kế thừa, đa hình, interface và xử lý ngoại lệ |
| 8 | Dự án cuối khóa: ứng dụng quản lý công việc có lưu dữ liệu |

### Khóa 1.2: Cấu trúc dữ liệu, thuật toán và tư duy giải quyết vấn đề

| Bài | Tên bài học |
|---:|---|
| 1 | Phân tích bài toán và viết thuật toán bằng pseudocode |
| 2 | Độ phức tạp thời gian, bộ nhớ và Big-O |
| 3 | Mảng, chuỗi, tìm kiếm tuyến tính và nhị phân |
| 4 | Sắp xếp cơ bản và cách chọn thuật toán |
| 5 | Stack, Queue, Linked List và ứng dụng |
| 6 | Hash table, Set, cây và duyệt cây |
| 7 | Đệ quy, greedy và quy hoạch động nhập môn |
| 8 | Dự án cuối khóa: giải bộ bài toán và phân tích độ phức tạp |

---

## 2. Phát triển Web

**Lĩnh vực chuyên môn liên quan:** HTML, CSS, JavaScript, TypeScript, React, Vue, Node.js, ASP.NET Core, REST API

### Khóa 2.1: Frontend Web từ HTML đến JavaScript

| Bài | Tên bài học |
|---:|---|
| 1 | Cách trình duyệt hoạt động và cấu trúc trang HTML |
| 2 | Semantic HTML, biểu mẫu và khả năng truy cập |
| 3 | CSS selector, box model, typography và màu sắc |
| 4 | Flexbox, Grid và bố cục responsive |
| 5 | JavaScript: biến, kiểu dữ liệu, điều kiện và vòng lặp |
| 6 | DOM, sự kiện, form validation và thao tác giao diện |
| 7 | Fetch API, async/await và xử lý lỗi |
| 8 | Dự án cuối khóa: website responsive có tìm kiếm và dữ liệu API |

### Khóa 2.2: Xây dựng ứng dụng Web Full-stack

| Bài | Tên bài học |
|---:|---|
| 1 | Kiến trúc client-server và thiết kế chức năng |
| 2 | Xây dựng giao diện React với component và props |
| 3 | State, form, validation và quản lý luồng giao diện |
| 4 | Xây dựng backend REST API với Node.js |
| 5 | Thiết kế cơ sở dữ liệu và CRUD |
| 6 | Đăng nhập, xác thực phiên và phân quyền cơ bản |
| 7 | Kết nối frontend-backend, xử lý lỗi và bảo vệ dữ liệu |
| 8 | Dự án cuối khóa: ứng dụng quản lý có đăng nhập và triển khai thử nghiệm |

---

## 3. Phát triển ứng dụng di động

**Lĩnh vực chuyên môn liên quan:** Android, iOS, Kotlin, Swift, Flutter, React Native, UI di động

### Khóa 3.1: Lập trình Flutter từ đầu

| Bài | Tên bài học |
|---:|---|
| 1 | Cài đặt Flutter, Dart và chạy ứng dụng đầu tiên |
| 2 | Cú pháp Dart, hàm, class và null safety |
| 3 | Widget, layout, theme và giao diện theo thiết kế |
| 4 | StatefulWidget, state và điều hướng màn hình |
| 5 | Form, validation và nhập dữ liệu |
| 6 | Gọi REST API, JSON, loading và error state |
| 7 | Lưu dữ liệu cục bộ và xử lý vòng đời ứng dụng |
| 8 | Dự án cuối khóa: ứng dụng quản lý chi tiêu có nhiều màn hình |

### Khóa 3.2: Phát triển ứng dụng Android với Kotlin

| Bài | Tên bài học |
|---:|---|
| 1 | Android Studio, cấu trúc project và Activity |
| 2 | Kotlin cơ bản, class, collection và null safety |
| 3 | Layout, Material components và responsive UI |
| 4 | Navigation, truyền dữ liệu và quản lý vòng đời |
| 5 | RecyclerView và hiển thị danh sách dữ liệu |
| 6 | Room database và lưu dữ liệu trên thiết bị |
| 7 | Kết nối API, quyền ứng dụng và xử lý ngoại lệ |
| 8 | Dự án cuối khóa: ứng dụng ghi chú có tìm kiếm và lưu cục bộ |

---

## 4. Cơ sở dữ liệu

**Lĩnh vực chuyên môn liên quan:** SQL Server, MySQL, PostgreSQL, MongoDB, mô hình dữ liệu, tối ưu truy vấn

### Khóa 4.1: SQL Server và SQL từ cơ bản đến thực hành

| Bài | Tên bài học |
|---:|---|
| 1 | Khái niệm cơ sở dữ liệu quan hệ và cài đặt SQL Server |
| 2 | Thiết kế bảng, khóa chính, khóa ngoại và kiểu dữ liệu |
| 3 | SELECT, WHERE, ORDER BY và DISTINCT |
| 4 | JOIN, GROUP BY, HAVING và hàm tổng hợp |
| 5 | INSERT, UPDATE, DELETE và ràng buộc dữ liệu |
| 6 | Subquery, CTE, view và stored procedure |
| 7 | Index, transaction, backup và quyền truy cập |
| 8 | Dự án cuối khóa: thiết kế database và báo cáo cho cửa hàng trực tuyến |

### Khóa 4.2: Thiết kế và tối ưu cơ sở dữ liệu

| Bài | Tên bài học |
|---:|---|
| 1 | Thu thập yêu cầu và chuyển thành mô hình dữ liệu |
| 2 | ERD, quan hệ và chuẩn hóa dữ liệu |
| 3 | Chọn kiểu dữ liệu, constraint và chiến lược khóa |
| 4 | Phân tích execution plan và truy vấn chậm |
| 5 | Index đơn, index ghép và tác động đến ghi dữ liệu |
| 6 | Transaction, isolation level, deadlock và khóa |
| 7 | Sao lưu, phục hồi, phân quyền và kiểm tra tính toàn vẹn |
| 8 | Dự án cuối khóa: tối ưu database trên bộ truy vấn mẫu |

---

## 5. AI và Machine Learning

**Lĩnh vực chuyên môn liên quan:** Machine Learning, Generative AI, LLM, NLP, Computer Vision, AI Agents

### Khóa 5.1: Machine Learning thực hành với Python

| Bài | Tên bài học |
|---:|---|
| 1 | Tổng quan AI, ML và quy trình một dự án dữ liệu |
| 2 | Python, NumPy, Pandas và chuẩn bị môi trường |
| 3 | Làm sạch dữ liệu, xử lý thiếu và mã hóa đặc trưng |
| 4 | Thống kê mô tả và khám phá dữ liệu |
| 5 | Hồi quy tuyến tính và đánh giá sai số |
| 6 | Phân loại, cây quyết định và chia tập dữ liệu |
| 7 | Overfitting, cross-validation và chọn mô hình |
| 8 | Dự án cuối khóa: xây dựng mô hình dự đoán và trình bày kết quả |

### Khóa 5.2: Xây dựng ứng dụng với Generative AI và LLM

| Bài | Tên bài học |
|---:|---|
| 1 | LLM hoạt động thế nào, giới hạn và rủi ro thường gặp |
| 2 | Prompting có cấu trúc và đánh giá chất lượng câu trả lời |
| 3 | Gọi mô hình qua API và quản lý khóa truy cập an toàn |
| 4 | Structured output, function calling và công cụ |
| 5 | Embeddings, vector search và khái niệm RAG |
| 6 | Xây dựng chatbot hỏi đáp trên tài liệu riêng |
| 7 | Đánh giá hallucination, quyền riêng tư và chi phí |
| 8 | Dự án cuối khóa: trợ lý AI có nguồn trích dẫn và bộ kiểm thử |

---

## 6. Khoa học dữ liệu và phân tích dữ liệu

**Lĩnh vực chuyên môn liên quan:** Excel, SQL, Power BI, Tableau, Python, thống kê, trực quan hóa

### Khóa 6.1: Phân tích dữ liệu với Excel và Power BI

| Bài | Tên bài học |
|---:|---|
| 1 | Xác định câu hỏi kinh doanh và hiểu cấu trúc dữ liệu |
| 2 | Làm sạch dữ liệu trong Excel và xử lý giá trị thiếu |
| 3 | Hàm tra cứu, hàm điều kiện và bảng tổng hợp |
| 4 | Power Query: kết nối, biến đổi và kết hợp dữ liệu |
| 5 | Mô hình dữ liệu, quan hệ bảng và DAX cơ bản |
| 6 | Thiết kế biểu đồ và dashboard dễ đọc |
| 7 | Kiểm tra số liệu, KPI và kể chuyện bằng dữ liệu |
| 8 | Dự án cuối khóa: dashboard doanh số có bộ lọc và khuyến nghị |

### Khóa 6.2: Phân tích dữ liệu với Python và SQL

| Bài | Tên bài học |
|---:|---|
| 1 | Python, notebook và quy trình phân tích có thể lặp lại |
| 2 | SQL để lọc, nối và tổng hợp dữ liệu |
| 3 | Pandas: đọc, chuẩn hóa, nhóm và kết hợp bảng |
| 4 | Thăm dò dữ liệu và phát hiện bất thường |
| 5 | Thống kê mô tả, tương quan và giới hạn suy luận |
| 6 | Trực quan hóa với Matplotlib và chọn biểu đồ |
| 7 | Viết kết luận, kiểm tra giả thuyết và tài liệu hóa |
| 8 | Dự án cuối khóa: phân tích dữ liệu khách hàng từ câu hỏi đến báo cáo |

---

## 7. An ninh mạng

**Lĩnh vực chuyên môn liên quan:** Bảo mật mạng, bảo mật Web, ethical hacking, pentest, bảo vệ tài khoản

### Khóa 7.1: Nền tảng an ninh mạng và phòng thủ cá nhân

| Bài | Tên bài học |
|---:|---|
| 1 | Mục tiêu bảo mật: bí mật, toàn vẹn và sẵn sàng |
| 2 | Mối đe dọa, lừa đảo, malware và kỹ thuật xã hội |
| 3 | Mật khẩu, MFA, quản lý thiết bị và cập nhật |
| 4 | TCP/IP, DNS, HTTPS và các điểm rủi ro |
| 5 | Phân quyền, nguyên tắc quyền tối thiểu và sao lưu |
| 6 | Đọc log cơ bản và nhận diện dấu hiệu bất thường |
| 7 | Lập kế hoạch ứng phó sự cố và phục hồi |
| 8 | Bài tập cuối khóa: xây dựng checklist bảo mật cho tổ chức nhỏ |

### Khóa 7.2: Kiểm thử bảo mật Web trong môi trường được phép

| Bài | Tên bài học |
|---:|---|
| 1 | Phạm vi, quy tắc pháp lý và môi trường lab an toàn |
| 2 | HTTP, cookie, session và mô hình xác thực |
| 3 | OWASP Top 10 và phân loại rủi ro ứng dụng |
| 4 | Kiểm tra đầu vào, quyền truy cập và cấu hình sai |
| 5 | Kiểm thử SQL injection trong lab minh họa |
| 6 | Kiểm thử XSS, CSRF và quản lý phiên trong lab |
| 7 | Ghi nhận bằng chứng, đánh giá mức độ ảnh hưởng và khuyến nghị |
| 8 | Dự án cuối khóa: báo cáo kiểm thử bảo mật trên ứng dụng mẫu được cấp phép |

---

## 8. Mạng máy tính và hệ thống

**Lĩnh vực chuyên môn liên quan:** TCP/IP, Cisco, Linux, Windows Server, quản trị mạng, DNS, DHCP

### Khóa 8.1: Mạng máy tính từ nền tảng đến cấu hình

| Bài | Tên bài học |
|---:|---|
| 1 | Mô hình OSI, TCP/IP và thiết bị mạng |
| 2 | IPv4, subnet mask, CIDR và chia subnet |
| 3 | Switch, VLAN, trunk và giao tiếp giữa VLAN |
| 4 | Routing tĩnh, default gateway và khái niệm routing động |
| 5 | DHCP, DNS, NAT và dịch vụ mạng phổ biến |
| 6 | Wi-Fi, firewall và nguyên tắc phân đoạn mạng |
| 7 | Dùng ping, traceroute, ipconfig và packet capture để xử lý lỗi |
| 8 | Bài tập cuối khóa: thiết kế và kiểm tra mạng cho văn phòng nhỏ |

### Khóa 8.2: Quản trị Linux Server cơ bản

| Bài | Tên bài học |
|---:|---|
| 1 | Cài Linux, shell, terminal và cấu trúc hệ thống tệp |
| 2 | Người dùng, nhóm, quyền và sudo |
| 3 | Quản lý package, process, service và systemd |
| 4 | Mạng Linux, SSH và cấu hình firewall cơ bản |
| 5 | Log, cron, dung lượng đĩa và giám sát tài nguyên |
| 6 | Triển khai web server và quản lý cấu hình |
| 7 | Backup, cập nhật, hardening và kiểm tra phục hồi |
| 8 | Dự án cuối khóa: cấu hình máy chủ Linux chạy dịch vụ mẫu |

---

## 9. Cloud Computing và DevOps

**Lĩnh vực chuyên môn liên quan:** AWS, Azure, Google Cloud, Docker, Kubernetes, CI/CD, Terraform

### Khóa 9.1: Triển khai ứng dụng lên Cloud

| Bài | Tên bài học |
|---:|---|
| 1 | Cloud computing, IaaS, PaaS, SaaS và mô hình chi phí |
| 2 | Tạo tài khoản lab, IAM và quyền truy cập an toàn |
| 3 | Máy ảo, mạng ảo, firewall và lưu trữ |
| 4 | Triển khai ứng dụng web và cấu hình biến môi trường |
| 5 | Database managed service, backup và kết nối bảo mật |
| 6 | Logging, monitoring, cảnh báo và ước tính chi phí |
| 7 | Triển khai cập nhật, rollback và xóa tài nguyên lab |
| 8 | Dự án cuối khóa: triển khai ứng dụng mẫu có HTTPS và giám sát |

### Khóa 9.2: Docker và CI/CD cho người mới

| Bài | Tên bài học |
|---:|---|
| 1 | Container, image, registry và Dockerfile |
| 2 | Build image tối ưu và quản lý layer |
| 3 | Docker Compose cho ứng dụng và database |
| 4 | Environment variables, secrets và network |
| 5 | Git workflow và quy trình kiểm tra tự động |
| 6 | Xây dựng CI để lint, test và build |
| 7 | CD, môi trường triển khai, rollback và quản lý phiên bản |
| 8 | Dự án cuối khóa: pipeline tự động kiểm thử và triển khai ứng dụng mẫu |

---

## 10. Kiểm thử phần mềm

**Lĩnh vực chuyên môn liên quan:** Manual testing, test case, API testing, automation, Selenium, Playwright, QA/QC

### Khóa 10.1: Kiểm thử phần mềm thủ công từ A đến Z

| Bài | Tên bài học |
|---:|---|
| 1 | Vai trò QA, QC, SDLC, STLC và thuật ngữ kiểm thử |
| 2 | Phân tích yêu cầu và xác định phạm vi kiểm thử |
| 3 | Viết test scenario, test case và dữ liệu kiểm thử |
| 4 | Equivalence partitioning, boundary value và decision table |
| 5 | Thực hiện test, ghi bug và viết báo cáo tái hiện lỗi |
| 6 | Regression, smoke, sanity và exploratory testing |
| 7 | Kiểm thử API cơ bản với Postman |
| 8 | Dự án cuối khóa: bộ test case và báo cáo kiểm thử một website mẫu |

### Khóa 10.2: Tự động hóa kiểm thử Web với Playwright

| Bài | Tên bài học |
|---:|---|
| 1 | Thiết lập Node.js, Playwright và cấu trúc test |
| 2 | Locator, assertion, timeout và chờ đúng cách |
| 3 | Kiểm thử form, điều hướng và trạng thái UI |
| 4 | Test data, fixture và tái sử dụng hàm hỗ trợ |
| 5 | Mock API, kiểm thử lỗi và trạng thái loading |
| 6 | Chạy song song, trace, screenshot và báo cáo |
| 7 | Tích hợp test vào CI và giảm flaky test |
| 8 | Dự án cuối khóa: bộ kiểm thử E2E cho luồng đăng nhập và mua hàng mẫu |

---

## 11. Kiến trúc và thiết kế phần mềm

**Lĩnh vực chuyên môn liên quan:** Clean Architecture, design patterns, SOLID, microservices, distributed systems

### Khóa 11.1: SOLID và Design Patterns qua ví dụ

| Bài | Tên bài học |
|---:|---|
| 1 | Tách trách nhiệm, phụ thuộc và nguyên tắc SOLID |
| 2 | Composition, interface và dependency injection |
| 3 | Strategy, Factory và Adapter |
| 4 | Decorator, Observer và xử lý sự kiện |
| 5 | Repository, Unit of Work và ranh giới dữ liệu |
| 6 | Refactoring code có dấu hiệu thiết kế kém |
| 7 | Unit test và cách kiểm tra thiết kế |
| 8 | Dự án cuối khóa: tái cấu trúc ứng dụng mẫu theo nguyên tắc thiết kế |

### Khóa 11.2: Clean Architecture và kiến trúc ứng dụng .NET

| Bài | Tên bài học |
|---:|---|
| 1 | Phân lớp Domain, Application, Infrastructure và API |
| 2 | Dependency Rule và tổ chức project |
| 3 | Use case, DTO, validation và xử lý lỗi |
| 4 | Repository, EF Core và biên giới persistence |
| 5 | CQRS, command/query handler và Mediator |
| 6 | Authentication, authorization và cấu hình an toàn |
| 7 | Unit/integration test và logging xuyên suốt |
| 8 | Dự án cuối khóa: API quản lý nghiệp vụ theo Clean Architecture |

---

## 12. Phát triển game

**Lĩnh vực chuyên môn liên quan:** Unity, Unreal Engine, gameplay, C#, đồ họa 3D, game design

### Khóa 12.1: Làm game 2D đầu tiên với Unity

| Bài | Tên bài học |
|---:|---|
| 1 | Cài Unity, cấu trúc scene và GameObject |
| 2 | Transform, sprite, animation và tilemap |
| 3 | C# script, input và vòng lặp gameplay |
| 4 | Va chạm, physics và điều khiển nhân vật |
| 5 | UI, điểm số, máu và trạng thái game |
| 6 | Âm thanh, hiệu ứng và chuyển scene |
| 7 | Lưu điểm, build game và kiểm thử |
| 8 | Dự án cuối khóa: game 2D có menu, nhiều màn và điều kiện thắng thua |

### Khóa 12.2: Phát triển game 3D với Unreal Engine

| Bài | Tên bài học |
|---:|---|
| 1 | Giao diện Unreal, level và actor |
| 2 | Blueprint và logic sự kiện cơ bản |
| 3 | Character, camera, input và điều khiển |
| 4 | Materials, ánh sáng và môi trường 3D |
| 5 | Collision, physics và tương tác vật thể |
| 6 | UI, điểm số và quản lý trạng thái |
| 7 | Tối ưu hiệu năng và đóng gói bản chơi thử |
| 8 | Dự án cuối khóa: prototype game 3D có mục tiêu và màn kết thúc |

---

## 13. Blockchain và Web3

**Lĩnh vực chuyên môn liên quan:** Blockchain, Solidity, smart contracts, dApps, ví số, Web3

### Khóa 13.1: Solidity và Smart Contract cơ bản

| Bài | Tên bài học |
|---:|---|
| 1 | Blockchain, block, transaction, wallet và gas |
| 2 | Cài công cụ phát triển và dùng testnet/local chain |
| 3 | Cú pháp Solidity, kiểu dữ liệu, hàm và visibility |
| 4 | Mapping, struct, event và error handling |
| 5 | Access control, ownership và kiểm tra đầu vào |
| 6 | Test hợp đồng và các lỗi thường gặp |
| 7 | Deploy hợp đồng lên môi trường thử nghiệm |
| 8 | Dự án cuối khóa: hợp đồng lưu hồ sơ mẫu có kiểm thử |

### Khóa 13.2: Xây dựng ứng dụng Web3

| Bài | Tên bài học |
|---:|---|
| 1 | Kiến trúc dApp: frontend, wallet và smart contract |
| 2 | Kết nối ví trên testnet và quản lý trạng thái |
| 3 | Đọc dữ liệu hợp đồng và xử lý transaction |
| 4 | Gọi contract bằng thư viện Web3 |
| 5 | Xác nhận giao dịch, lỗi mạng và pending state |
| 6 | Kiểm tra bảo mật, quyền người dùng và dữ liệu hiển thị |
| 7 | Triển khai frontend và cấu hình môi trường test |
| 8 | Dự án cuối khóa: dApp đơn giản tương tác với hợp đồng thử nghiệm |

---

## 14. IoT và hệ thống nhúng

**Lĩnh vực chuyên môn liên quan:** Arduino, ESP32, Raspberry Pi, C/C++, cảm biến, IoT, robotics

### Khóa 14.1: IoT thực hành với ESP32

| Bài | Tên bài học |
|---:|---|
| 1 | Tổng quan IoT, điện cơ bản và an toàn phần cứng |
| 2 | Cài IDE, kết nối board và chạy chương trình đầu tiên |
| 3 | Đọc cảm biến và điều khiển LED/relay |
| 4 | Đọc tín hiệu analog, lọc nhiễu và hiệu chỉnh |
| 5 | Kết nối Wi-Fi, HTTP và MQTT |
| 6 | Gửi dữ liệu lên dashboard và xử lý mất kết nối |
| 7 | Bảo vệ thông tin xác thực và cập nhật thiết bị |
| 8 | Dự án cuối khóa: thiết bị giám sát môi trường có cảnh báo |

### Khóa 14.2: Lập trình C cho hệ thống nhúng

| Bài | Tên bài học |
|---:|---|
| 1 | Vi kiến trúc MCU, bộ nhớ và toolchain |
| 2 | C, con trỏ, struct và thao tác bit |
| 3 | GPIO, timer, interrupt và debounce |
| 4 | UART, SPI, I2C và giao tiếp ngoại vi |
| 5 | Đọc datasheet và viết driver đơn giản |
| 6 | Quản lý bộ nhớ, watchdog và xử lý lỗi |
| 7 | Debug bằng serial/log và kiểm thử phần cứng |
| 8 | Dự án cuối khóa: bộ điều khiển cảm biến có nhiều chế độ hoạt động |

---

## 15. UI/UX và thiết kế sản phẩm số

**Lĩnh vực chuyên môn liên quan:** Figma, user research, wireframe, prototype, design system, accessibility

### Khóa 15.1: Figma từ wireframe đến prototype

| Bài | Tên bài học |
|---:|---|
| 1 | Nguyên tắc thiết kế giao diện và đọc brief |
| 2 | Frame, grid, spacing, typography và màu sắc |
| 3 | Auto Layout, component, variant và style |
| 4 | Thiết kế luồng người dùng và wireframe |
| 5 | Tạo prototype tương tác và trạng thái giao diện |
| 6 | Responsive layout và các pattern điều hướng |
| 7 | Accessibility, kiểm tra usability và handoff |
| 8 | Dự án cuối khóa: prototype ứng dụng có bộ component và tài liệu bàn giao |

### Khóa 15.2: UX Research và thiết kế lấy người dùng làm trung tâm

| Bài | Tên bài học |
|---:|---|
| 1 | Xác định vấn đề, mục tiêu nghiên cứu và giả định |
| 2 | Phân khúc người dùng, phỏng vấn và khảo sát |
| 3 | Tổng hợp insight, persona và journey map |
| 4 | Phân tích đối thủ và heuristic evaluation |
| 5 | Xây dựng user flow và ưu tiên vấn đề |
| 6 | Thử nghiệm prototype và ghi nhận usability |
| 7 | Tổng hợp kết quả và đề xuất cải thiện |
| 8 | Dự án cuối khóa: case study UX từ nghiên cứu đến thiết kế đã kiểm thử |

---

## 16. Thiết kế đồ họa

**Lĩnh vực chuyên môn liên quan:** Photoshop, Illustrator, InDesign, branding, layout, quảng cáo

### Khóa 16.1: Photoshop cho thiết kế truyền thông

| Bài | Tên bài học |
|---:|---|
| 1 | Không gian làm việc, layer và quản lý file |
| 2 | Selection, mask và chỉnh sửa ảnh không phá hủy |
| 3 | Màu sắc, ánh sáng, retouch và cân bằng ảnh |
| 4 | Typography và kết hợp hình với chữ |
| 5 | Thiết kế banner và bài đăng mạng xã hội |
| 6 | Mockup, smart object và quy tắc xuất file |
| 7 | Xây dựng bộ thiết kế nhất quán cho chiến dịch |
| 8 | Dự án cuối khóa: bộ ấn phẩm truyền thông đa kích thước |

### Khóa 16.2: Illustrator và thiết kế nhận diện thương hiệu

| Bài | Tên bài học |
|---:|---|
| 1 | Vector, path, shape và pen tool |
| 2 | Màu, lưới, typography và phân cấp thị giác |
| 3 | Biểu tượng, logo và nguyên tắc nhận diện |
| 4 | Tạo pattern, illustration và tài nguyên vector |
| 5 | Thiết kế danh thiếp, bao bì và tài liệu thương hiệu |
| 6 | Quy chuẩn logo, vùng an toàn và biến thể |
| 7 | Chuẩn bị file in, xuất định dạng và bàn giao |
| 8 | Dự án cuối khóa: bộ nhận diện thương hiệu mini có brand guideline |

---

## 17. Thiết kế 3D và kiến trúc

**Lĩnh vực chuyên môn liên quan:** Blender, 3ds Max, SketchUp, AutoCAD, dựng hình, diễn họa kiến trúc

### Khóa 17.1: SketchUp và dựng mô hình kiến trúc

| Bài | Tên bài học |
|---:|---|
| 1 | Giao diện, trục tọa độ và thao tác điều hướng |
| 2 | Vẽ hình học, push/pull và dựng khối |
| 3 | Group, component, tag và tổ chức model |
| 4 | Dựng mặt bằng và mô hình công trình đơn giản |
| 5 | Vật liệu, texture, ánh sáng và góc camera |
| 6 | Bố trí nội thất và tỷ lệ không gian |
| 7 | Xuất bản vẽ, hình phối cảnh và kiểm tra model |
| 8 | Dự án cuối khóa: mô hình căn hộ kèm bộ phối cảnh |

### Khóa 17.2: Blender 3D từ modeling đến rendering

| Bài | Tên bài học |
|---:|---|
| 1 | Giao diện Blender, mesh và transform |
| 2 | Edit mode, topology và modeling hard-surface |
| 3 | Modifier, UV unwrap và texture |
| 4 | Shader, vật liệu và hệ thống node |
| 5 | Bố trí ánh sáng, camera và composition |
| 6 | Rigging/animation nhập môn cho vật thể |
| 7 | Render, tối ưu scene và quản lý tài nguyên |
| 8 | Dự án cuối khóa: sản phẩm 3D hoàn chỉnh có render trình bày |

---

## 18. Nhiếp ảnh

**Lĩnh vực chuyên môn liên quan:** Ảnh chân dung, sản phẩm, phong cảnh, ánh sáng, bố cục, chỉnh sửa ảnh

### Khóa 18.1: Nhiếp ảnh căn bản với máy ảnh

| Bài | Tên bài học |
|---:|---|
| 1 | Hiểu cảm biến, tiêu cự và các chế độ chụp |
| 2 | Tam giác phơi sáng: khẩu độ, tốc độ và ISO |
| 3 | Lấy nét, cân bằng trắng và đo sáng |
| 4 | Bố cục, đường dẫn mắt và kể chuyện bằng ảnh |
| 5 | Ánh sáng tự nhiên và chụp trong điều kiện khó |
| 6 | Chân dung, phong cảnh và chuyển động |
| 7 | Chọn ảnh, quản lý file RAW và chỉnh sửa cơ bản |
| 8 | Dự án cuối khóa: bộ ảnh 8–12 tấm theo một chủ đề |

### Khóa 18.2: Chụp ảnh sản phẩm và ánh sáng studio

| Bài | Tên bài học |
|---:|---|
| 1 | Xác định mục tiêu ảnh và chuẩn bị sản phẩm |
| 2 | Setup phông nền, chân máy và bố cục |
| 3 | Ánh sáng một nguồn, tản sáng và phản quang |
| 4 | Chụp vật liệu bóng, trong suốt và phản chiếu |
| 5 | Tạo ảnh lifestyle và ảnh thương mại |
| 6 | Chỉnh màu, retouch và đồng bộ bộ ảnh |
| 7 | Chuẩn hóa kích thước, nền và file bàn giao |
| 8 | Dự án cuối khóa: bộ ảnh sản phẩm cho một trang bán hàng |

---

## 19. Video và sản xuất nội dung

**Lĩnh vực chuyên môn liên quan:** Premiere Pro, DaVinci Resolve, After Effects, dựng phim, âm thanh, motion graphics

### Khóa 19.1: Dựng video với Premiere Pro

| Bài | Tên bài học |
|---:|---|
| 1 | Chuẩn bị footage, project và thiết lập sequence |
| 2 | Cắt ghép, nhịp dựng và quản lý timeline |
| 3 | Thu âm, làm sạch tiếng và cân bằng âm lượng |
| 4 | Chỉnh màu cơ bản và đồng bộ hình ảnh |
| 5 | Tiêu đề, subtitle, transition và đồ họa |
| 6 | Dựng video phỏng vấn và video hướng dẫn |
| 7 | Export theo nền tảng và kiểm tra chất lượng |
| 8 | Dự án cuối khóa: video 3–5 phút có âm thanh, tiêu đề và phụ đề |

### Khóa 19.2: Motion Graphics nhập môn với After Effects

| Bài | Tên bài học |
|---:|---|
| 1 | Composition, layer, keyframe và timeline |
| 2 | Animation easing, graph editor và chuyển động mượt |
| 3 | Shape layer, mask, track matte và typography động |
| 4 | Tracking, chroma key và ghép lớp cơ bản |
| 5 | Đồ họa dữ liệu và lower third |
| 6 | Âm thanh, nhịp chuyển động và đồng bộ |
| 7 | Render, codec và quản lý phiên bản |
| 8 | Dự án cuối khóa: đoạn motion graphic 20–30 giây cho thương hiệu |

---

## 20. Sáng tạo nội dung số

**Lĩnh vực chuyên môn liên quan:** YouTube, TikTok, podcast, kịch bản, lịch nội dung, phát triển kênh

### Khóa 20.1: Xây dựng kênh nội dung từ con số 0

| Bài | Tên bài học |
|---:|---|
| 1 | Xác định mục tiêu, chủ đề và đối tượng người xem |
| 2 | Nghiên cứu nhu cầu và xây dựng định vị kênh |
| 3 | Lập lịch nội dung và tạo chuỗi chủ đề |
| 4 | Viết hook, dàn ý và kịch bản ngắn |
| 5 | Quay/chụp bằng thiết bị sẵn có |
| 6 | Tối ưu tiêu đề, thumbnail và lời kêu gọi hành động |
| 7 | Đọc chỉ số, thử nghiệm và cải thiện nội dung |
| 8 | Dự án cuối khóa: kế hoạch nội dung 30 ngày cùng 3 sản phẩm mẫu |

### Khóa 20.2: Sản xuất video ngắn cho TikTok và Reels

| Bài | Tên bài học |
|---:|---|
| 1 | Hiểu định dạng dọc, thời lượng và mục tiêu video |
| 2 | Tìm ý tưởng từ câu hỏi, xu hướng và trải nghiệm thật |
| 3 | Viết kịch bản hook–nội dung–kết thúc |
| 4 | Quay bằng điện thoại, bố cục và ánh sáng |
| 5 | Dựng nhịp nhanh, phụ đề và âm thanh hợp lệ |
| 6 | Tạo series, lịch đăng và nhận diện nhất quán |
| 7 | Phân tích retention và thử các biến thể |
| 8 | Dự án cuối khóa: sản xuất một series 5 video có kế hoạch đo lường |

---

## 21. Digital Marketing

**Lĩnh vực chuyên môn liên quan:** SEO, SEM, Google Ads, Facebook Ads, social media, analytics

### Khóa 21.1: Digital Marketing nền tảng

| Bài | Tên bài học |
|---:|---|
| 1 | Phễu marketing, chân dung khách hàng và hành trình mua |
| 2 | Nghiên cứu thị trường, đối thủ và thông điệp |
| 3 | Website, landing page và mục tiêu chuyển đổi |
| 4 | SEO cơ bản và nội dung tìm kiếm |
| 5 | Social media, lịch đăng và cộng đồng |
| 6 | Email marketing và nuôi dưỡng khách hàng |
| 7 | Tracking, UTM và đọc báo cáo hiệu quả |
| 8 | Dự án cuối khóa: kế hoạch digital marketing cho sản phẩm mẫu |

### Khóa 21.2: Quảng cáo hiệu suất và tối ưu chiến dịch

| Bài | Tên bài học |
|---:|---|
| 1 | Mục tiêu chiến dịch, ngân sách và chỉ số đo lường |
| 2 | Nghiên cứu audience và cấu trúc tài khoản quảng cáo |
| 3 | Thông điệp, creative và biến thể nội dung |
| 4 | Thiết lập tracking chuyển đổi và kiểm tra dữ liệu |
| 5 | Chạy thử nghiệm A/B có giả thuyết |
| 6 | Đọc CPC, CTR, CPA, ROAS và giới hạn diễn giải |
| 7 | Tối ưu ngân sách, landing page và báo cáo |
| 8 | Dự án cuối khóa: kế hoạch thử nghiệm quảng cáo với dữ liệu mô phỏng |

---

## 22. Content Marketing và Copywriting

**Lĩnh vực chuyên môn liên quan:** SEO copywriting, bài blog, landing page, email, storytelling, nội dung thương hiệu

### Khóa 22.1: Viết nội dung SEO từ nghiên cứu đến xuất bản

| Bài | Tên bài học |
|---:|---|
| 1 | Ý định tìm kiếm và nghiên cứu câu hỏi người đọc |
| 2 | Chọn từ khóa chủ đề và xây dựng content brief |
| 3 | Lập dàn ý, tiêu đề và cấu trúc bài viết |
| 4 | Viết mở bài, nội dung chính và ví dụ minh họa |
| 5 | On-page SEO, liên kết nội bộ và metadata |
| 6 | Kiểm chứng thông tin, biên tập và tránh nội dung rập khuôn |
| 7 | Đo hiệu quả bài viết và cập nhật nội dung |
| 8 | Dự án cuối khóa: xuất bản cụm 3 bài viết có liên kết chủ đề |

### Khóa 22.2: Copywriting cho landing page và email

| Bài | Tên bài học |
|---:|---|
| 1 | Tìm hiểu sản phẩm, khách hàng và rào cản mua |
| 2 | Lợi ích, bằng chứng, định vị và đề xuất giá trị |
| 3 | Công thức viết AIDA, PAS và cách chọn đúng ngữ cảnh |
| 4 | Viết hero, lợi ích, FAQ và lời kêu gọi hành động |
| 5 | Chuỗi email chào mừng và chăm sóc khách hàng |
| 6 | Kiểm tra giọng thương hiệu, tuyên bố và tính trung thực |
| 7 | A/B test thông điệp và đọc chỉ số email |
| 8 | Dự án cuối khóa: landing page và chuỗi 3 email cho một sản phẩm |

---

## 23. Kinh doanh và bán hàng

**Lĩnh vực chuyên môn liên quan:** Sales, B2B, B2C, tư vấn khách hàng, đàm phán, chăm sóc khách hàng

### Khóa 23.1: Kỹ năng bán hàng tư vấn

| Bài | Tên bài học |
|---:|---|
| 1 | Quy trình bán hàng và đạo đức nghề bán hàng |
| 2 | Xác định khách hàng phù hợp và chuẩn bị tiếp cận |
| 3 | Đặt câu hỏi khám phá nhu cầu |
| 4 | Trình bày giá trị thay vì chỉ nêu tính năng |
| 5 | Xử lý phản đối về giá, thời gian và ưu tiên |
| 6 | Đàm phán, thống nhất điều kiện và chốt bước tiếp theo |
| 7 | Theo dõi khách hàng và chăm sóc sau bán |
| 8 | Bài tập cuối khóa: mô phỏng cuộc tư vấn từ mở đầu đến follow-up |

### Khóa 23.2: Bán hàng B2B và quản lý cơ hội
| Bài | Tên bài học |
|---:|---|
| 1 | Mô hình B2B, hội đồng mua và quy trình ra quyết định |
| 2 | Tìm kiếm khách hàng tiềm năng và nghiên cứu tài khoản |
| 3 | Viết email tiếp cận và tổ chức discovery call |
| 4 | Đánh giá nhu cầu, ngân sách, quyền quyết định và thời gian |
| 5 | Xây dựng đề xuất, demo và business case |
| 6 | Quản lý pipeline, CRM và dự báo bán hàng |
| 7 | Đàm phán hợp đồng và chuyển giao khách hàng |
| 8 | Dự án cuối khóa: pipeline mẫu với kế hoạch tiếp cận 10 tài khoản |

---

## 24. Thương mại điện tử

**Lĩnh vực chuyên môn liên quan:** Cửa hàng trực tuyến, marketplace, quản lý sản phẩm, vận hành đơn, CRO

### Khóa 24.1: Khởi tạo cửa hàng trực tuyến

| Bài | Tên bài học |
|---:|---|
| 1 | Mô hình e-commerce, chọn ngách và nghiên cứu đối thủ |
| 2 | Danh mục sản phẩm, định giá và mô tả sản phẩm |
| 3 | Thiết lập cửa hàng và cấu trúc điều hướng |
| 4 | Ảnh sản phẩm, trang chi tiết và chính sách mua hàng |
| 5 | Thanh toán, vận chuyển, tồn kho và đơn hàng |
| 6 | Chăm sóc khách hàng, đổi trả và xử lý khiếu nại |
| 7 | Phân tích traffic, đơn hàng và tỷ lệ chuyển đổi |
| 8 | Dự án cuối khóa: dựng cửa hàng demo từ danh mục đến quy trình đơn |

### Khóa 24.2: Tối ưu chuyển đổi cho website bán hàng

| Bài | Tên bài học |
|---:|---|
| 1 | Đọc funnel và xác định điểm rơi chuyển đổi |
| 2 | Đánh giá trang danh mục, tìm kiếm và lọc |
| 3 | Tối ưu trang sản phẩm, nội dung và bằng chứng tin cậy |
| 4 | Giảm ma sát trong giỏ hàng và checkout |
| 5 | Đo lường event, UTM và chất lượng tracking |
| 6 | Thiết kế thử nghiệm A/B và ưu tiên theo tác động |
| 7 | Phân tích kết quả không nhầm tương quan với nhân quả |
| 8 | Dự án cuối khóa: kế hoạch CRO dựa trên bộ dữ liệu giả lập |

---

## 25. Quản trị doanh nghiệp

**Lĩnh vực chuyên môn liên quan:** Chiến lược, vận hành, quy trình, tổ chức, quản lý hiệu suất

### Khóa 25.1: Quản trị doanh nghiệp cho người mới

| Bài | Tên bài học |
|---:|---|
| 1 | Vai trò quản trị và các chức năng lập kế hoạch–tổ chức–điều hành |
| 2 | Mục tiêu, KPI và cách liên kết với chiến lược |
| 3 | Cơ cấu tổ chức, trách nhiệm và luồng quyết định |
| 4 | Lập ngân sách và phân bổ nguồn lực |
| 5 | Quản lý quy trình, chất lượng và rủi ro |
| 6 | Giao tiếp nội bộ, phản hồi và giải quyết xung đột |
| 7 | Đọc báo cáo vận hành và ra quyết định dựa trên dữ liệu |
| 8 | Dự án cuối khóa: kế hoạch vận hành 90 ngày cho nhóm nhỏ |

### Khóa 25.2: Quản lý vận hành và cải tiến quy trình

| Bài | Tên bài học |
|---:|---|
| 1 | Vẽ quy trình hiện tại và xác định điểm nghẽn |
| 2 | Đo thời gian, lỗi, chi phí và mức độ dịch vụ |
| 3 | Phân tích nguyên nhân gốc rễ bằng 5 Whys và sơ đồ xương cá |
| 4 | Chuẩn hóa SOP và trách nhiệm thực hiện |
| 5 | Quản lý chất lượng và vòng lặp cải tiến |
| 6 | Quản lý năng lực, hàng đợi và tải công việc |
| 7 | Thiết lập dashboard vận hành và họp rà soát |
| 8 | Dự án cuối khóa: cải tiến một quy trình với baseline và KPI |

---

## 26. Quản lý dự án

**Lĩnh vực chuyên môn liên quan:** Agile, Scrum, Kanban, lập kế hoạch, rủi ro, Jira, stakeholder

### Khóa 26.1: Quản lý dự án theo Agile và Scrum

| Bài | Tên bài học |
|---:|---|
| 1 | Dự án, sản phẩm, phạm vi và giá trị cần bàn giao |
| 2 | Vai trò Scrum, sự kiện và artifact |
| 3 | Product vision, backlog và viết user story |
| 4 | Ước lượng, ưu tiên và lập kế hoạch sprint |
| 5 | Daily, review, retrospective và xử lý trở ngại |
| 6 | Theo dõi tiến độ bằng burndown và flow metrics |
| 7 | Quản lý thay đổi, rủi ro và kỳ vọng stakeholder |
| 8 | Dự án cuối khóa: mô phỏng ba sprint cho sản phẩm nhỏ |

### Khóa 26.2: Quản lý dự án từ khởi động đến bàn giao

| Bài | Tên bài học |
|---:|---|
| 1 | Business case, mục tiêu và tiêu chí thành công |
| 2 | Phạm vi, WBS, phụ thuộc và milestone |
| 3 | Ước lượng thời gian, nguồn lực và chi phí |
| 4 | Lập lịch và phân công trách nhiệm |
| 5 | Quản lý rủi ro, vấn đề và thay đổi |
| 6 | Giao tiếp, báo cáo và quản lý stakeholder |
| 7 | Nghiệm thu, bàn giao và lessons learned |
| 8 | Dự án cuối khóa: bộ kế hoạch dự án có lịch, ngân sách và risk register |

---

## 27. Tài chính và đầu tư

**Lĩnh vực chuyên môn liên quan:** Tài chính cá nhân, ngân sách, phân tích tài chính, định giá, quản lý rủi ro

### Khóa 27.1: Quản lý tài chính cá nhân

| Bài | Tên bài học |
|---:|---|
| 1 | Thu nhập, chi phí, tài sản, nợ và dòng tiền |
| 2 | Lập ngân sách và theo dõi chi tiêu |
| 3 | Quỹ dự phòng, mục tiêu tiết kiệm và quản lý nợ |
| 4 | Lãi đơn, lãi kép, lạm phát và giá trị thời gian của tiền |
| 5 | Rủi ro, bảo hiểm và nguyên tắc đa dạng hóa |
| 6 | Các loại tài sản và cách đọc thông tin cơ bản |
| 7 | Nhận diện lừa đảo và xây dựng kế hoạch tài chính |
| 8 | Bài tập cuối khóa: lập kế hoạch ngân sách cá nhân 12 tháng |

### Khóa 27.2: Đọc hiểu báo cáo tài chính và định giá cơ bản

| Bài | Tên bài học |
|---:|---|
| 1 | Mục tiêu phân tích và các báo cáo tài chính chính |
| 2 | Phân tích doanh thu, lợi nhuận và dòng tiền |
| 3 | Tỷ số thanh khoản, đòn bẩy và hiệu quả hoạt động |
| 4 | Chất lượng lợi nhuận và các dấu hiệu cần kiểm tra |
| 5 | Dự phóng doanh thu, chi phí và dòng tiền |
| 6 | Khái niệm chiết khấu dòng tiền và giả định định giá |
| 7 | Phân tích kịch bản, độ nhạy và rủi ro |
| 8 | Dự án cuối khóa: bản phân tích công ty từ bộ báo cáo mẫu |

---

## 28. Kế toán và kiểm toán

**Lĩnh vực chuyên môn liên quan:** Kế toán cơ bản, sổ sách, báo cáo tài chính, thuế, kiểm soát nội bộ

### Khóa 28.1: Nguyên lý kế toán doanh nghiệp

| Bài | Tên bài học |
|---:|---|
| 1 | Mục đích kế toán và phương trình kế toán |
| 2 | Tài khoản, ghi Nợ/Có và bút toán kép |
| 3 | Chứng từ, sổ nhật ký và sổ cái |
| 4 | Ghi nhận doanh thu, chi phí, tài sản và công nợ |
| 5 | Khấu hao, hàng tồn kho và điều chỉnh cuối kỳ |
| 6 | Lập bảng cân đối thử và đối chiếu số liệu |
| 7 | Lập báo cáo kết quả kinh doanh và bảng cân đối kế toán |
| 8 | Bài tập cuối khóa: ghi sổ một kỳ kế toán cho doanh nghiệp giả lập |

### Khóa 28.2: Đọc báo cáo tài chính và kiểm soát chứng từ

| Bài | Tên bài học |
|---:|---|
| 1 | Cấu trúc và mối liên hệ giữa các báo cáo |
| 2 | Đối chiếu ngân hàng, công nợ và hàng tồn kho |
| 3 | Kiểm soát hóa đơn và hồ sơ giao dịch |
| 4 | Phân tích biến động và các khoản bất thường |
| 5 | Kiểm soát nội bộ, phân quyền và dấu vết kiểm tra |
| 6 | Lập lịch đóng sổ và danh sách kiểm tra cuối kỳ |
| 7 | Chuẩn bị hồ sơ và phối hợp kiểm toán |
| 8 | Dự án cuối khóa: rà soát bộ chứng từ và lập báo cáo phát hiện |

---

## 29. Nhân sự

**Lĩnh vực chuyên môn liên quan:** Tuyển dụng, onboarding, đào tạo, C&B, hiệu suất, văn hóa doanh nghiệp

### Khóa 29.1: Tuyển dụng từ mô tả công việc đến nhận việc

| Bài | Tên bài học |
|---:|---|
| 1 | Vai trò tuyển dụng và kế hoạch nhân lực |
| 2 | Phân tích vị trí và viết mô tả công việc |
| 3 | Xây dựng tiêu chí, kênh tìm ứng viên và tin tuyển dụng |
| 4 | Sàng lọc CV và phỏng vấn có cấu trúc |
| 5 | Đánh giá công bằng, tránh thiên kiến và ghi nhận bằng chứng |
| 6 | Tham chiếu, đề nghị tuyển dụng và thương lượng |
| 7 | Onboarding, thử việc và đo trải nghiệm ứng viên |
| 8 | Dự án cuối khóa: quy trình tuyển dụng cho một vị trí mẫu |

### Khóa 29.2: Vận hành nhân sự và quản lý hiệu suất

| Bài | Tên bài học |
|---:|---|
| 1 | Vòng đời nhân viên và hồ sơ nhân sự |
| 2 | Chấm công, nghỉ phép và quy trình phê duyệt |
| 3 | Cơ cấu lương thưởng và nguyên tắc bảo mật |
| 4 | Đào tạo, phân tích nhu cầu và kế hoạch phát triển |
| 5 | Mục tiêu, KPI và phản hồi hiệu suất |
| 6 | Quan hệ lao động, nội quy và xử lý tình huống |
| 7 | Báo cáo nhân sự và bảo vệ dữ liệu cá nhân |
| 8 | Dự án cuối khóa: thiết kế bộ quy trình HR cho doanh nghiệp nhỏ |

---

## 30. Logistics và chuỗi cung ứng

**Lĩnh vực chuyên môn liên quan:** Kho vận, vận tải, xuất nhập khẩu, mua hàng, tồn kho, hoạch định nhu cầu

### Khóa 30.1: Nền tảng Logistics và chuỗi cung ứng

| Bài | Tên bài học |
|---:|---|
| 1 | Dòng hàng, dòng thông tin và dòng tiền trong chuỗi cung ứng |
| 2 | Incoterms và khái niệm vận chuyển cơ bản |
| 3 | Lập kế hoạch nhu cầu và dự báo nhập môn |
| 4 | Quản lý nhà cung cấp và quy trình mua hàng |
| 5 | Tồn kho, mức đặt hàng lại và tồn kho an toàn |
| 6 | Vận tải, theo dõi giao hàng và xử lý chậm trễ |
| 7 | KPI giao hàng, chi phí và mức phục vụ |
| 8 | Dự án cuối khóa: lập kế hoạch chuỗi cung ứng cho sản phẩm mẫu |

### Khóa 30.2: Quản lý kho và nghiệp vụ xuất nhập khẩu

| Bài | Tên bài học |
|---:|---|
| 1 | Bố trí kho, luồng nhập–lưu–soạn–xuất |
| 2 | Mã hàng, barcode và kiểm kê |
| 3 | FIFO, FEFO và kiểm soát lô hàng |
| 4 | Chứng từ thương mại và bộ hồ sơ cơ bản |
| 5 | Quy trình thông quan và phối hợp đơn vị liên quan |
| 6 | Tính chi phí logistics và quản lý ngoại lệ |
| 7 | An toàn kho, truy xuất và kiểm soát sai lệch |
| 8 | Dự án cuối khóa: mô phỏng quy trình đơn nhập khẩu đến giao kho |

---

## 31. Tiếng Anh

**Lĩnh vực chuyên môn liên quan:** Giao tiếp, IELTS, TOEIC, tiếng Anh thương mại, tiếng Anh IT

### Khóa 31.1: Tiếng Anh nền tảng A1–A2

| Bài | Tên bài học |
|---:|---|
| 1 | Phát âm, bảng chữ cái, số và cách đánh vần |
| 2 | Giới thiệu bản thân, gia đình và thông tin cá nhân |
| 3 | Động từ be, thì hiện tại đơn và câu hỏi cơ bản |
| 4 | Từ vựng hằng ngày, thời gian, lịch và thói quen |
| 5 | Hỏi đường, mua sắm và giao tiếp tại nơi công cộng |
| 6 | Quá khứ đơn, kế hoạch tương lai và kể trải nghiệm |
| 7 | Nghe hội thoại ngắn, đọc thông báo và viết đoạn văn |
| 8 | Bài tổng kết: hội thoại thực tế và hồ sơ tự học cá nhân |

### Khóa 31.2: Tiếng Anh giao tiếp trong môi trường công việc

| Bài | Tên bài học |
|---:|---|
| 1 | Giới thiệu bản thân và mô tả vai trò công việc |
| 2 | Small talk và bắt đầu cuộc trò chuyện chuyên nghiệp |
| 3 | Viết email rõ ràng với mục đích và hành động cụ thể |
| 4 | Tham gia họp, xin làm rõ và tóm tắt ý kiến |
| 5 | Trình bày số liệu, xu hướng và kết luận |
| 6 | Điện thoại, lịch hẹn và xử lý hiểu nhầm |
| 7 | Phỏng vấn, kể ví dụ theo cấu trúc và hỏi nhà tuyển dụng |
| 8 | Dự án cuối khóa: mô phỏng một tuần giao tiếp tại nơi làm việc |

---

## 32. Ngoại ngữ khác

**Lĩnh vực chuyên môn liên quan:** Tiếng Nhật, Hàn, Trung, Pháp, Đức và giao tiếp đa ngôn ngữ

### Khóa 32.1: Tiếng Nhật nhập môn hướng đến JLPT N5

| Bài | Tên bài học |
|---:|---|
| 1 | Hiragana, phát âm và quy tắc viết cơ bản |
| 2 | Katakana và từ mượn thông dụng |
| 3 | Chào hỏi, giới thiệu bản thân và số đếm |
| 4 | Trật tự câu, trợ từ は・の・を・に |
| 5 | Động từ hiện tại, phủ định và câu hỏi |
| 6 | Thời gian, địa điểm, mua sắm và chỉ đường |
| 7 | Nghe hội thoại ngắn và đọc đoạn văn cơ bản |
| 8 | Bài tổng kết: hội thoại và bài ôn tập theo dạng N5 |

### Khóa 32.2: Tiếng Hàn sơ cấp dành cho người mới

| Bài | Tên bài học |
|---:|---|
| 1 | Hangeul, nguyên âm, phụ âm và quy tắc phát âm |
| 2 | Chào hỏi, giới thiệu và cách xưng hô |
| 3 | Danh từ, tiểu từ 은/는, 이/가 và 이에요/예요 |
| 4 | Số thuần Hàn, số Hán Hàn, giờ và ngày tháng |
| 5 | Động từ tính từ và đuôi câu thân mật lịch sự |
| 6 | Địa điểm, ăn uống, mua sắm và hỏi đường |
| 7 | Nghe đọc hội thoại và viết đoạn ngắn |
| 8 | Bài tổng kết: hội thoại đời sống theo chủ đề |

---

## 33. Giáo dục và đào tạo

**Lĩnh vực chuyên môn liên quan:** Thiết kế bài giảng, phương pháp sư phạm, đào tạo trực tuyến, đánh giá học tập

### Khóa 33.1: Thiết kế khóa học và chương trình học

| Bài | Tên bài học |
|---:|---|
| 1 | Xác định người học, bối cảnh và nhu cầu |
| 2 | Viết mục tiêu học tập có thể đánh giá |
| 3 | Sắp xếp nội dung theo kiến thức tiên quyết |
| 4 | Chọn hoạt động học và phương pháp giảng dạy |
| 5 | Thiết kế bài tập, rubric và đánh giá quá trình |
| 6 | Tạo tài liệu, video và học liệu dễ tiếp cận |
| 7 | Thử nghiệm khóa học và thu thập phản hồi |
| 8 | Dự án cuối khóa: bản thiết kế khóa học có mục tiêu, bài học và đánh giá |

### Khóa 33.2: Giảng dạy trực tuyến hiệu quả

| Bài | Tên bài học |
|---:|---|
| 1 | Đặc điểm học trực tuyến và duy trì sự chú ý |
| 2 | Thiết kế buổi học ngắn có mục tiêu rõ |
| 3 | Tạo video bài học và tài liệu đi kèm |
| 4 | Tổ chức tương tác, thảo luận và hoạt động nhóm |
| 5 | Đánh giá trực tuyến và phản hồi cho người học |
| 6 | Khả năng tiếp cận, quyền riêng tư và bản quyền học liệu |
| 7 | Theo dõi tiến độ và hỗ trợ người học gặp khó khăn |
| 8 | Dự án cuối khóa: xây dựng một module học online hoàn chỉnh |

---

## 34. Kỹ năng mềm

**Lĩnh vực chuyên môn liên quan:** Giao tiếp, thuyết trình, tư duy phản biện, làm việc nhóm, giải quyết xung đột

### Khóa 34.1: Giao tiếp và hợp tác trong công việc

| Bài | Tên bài học |
|---:|---|
| 1 | Lắng nghe chủ động và đặt câu hỏi làm rõ |
| 2 | Diễn đạt ý ngắn gọn, có cấu trúc và đúng ngữ cảnh |
| 3 | Phản hồi mang tính xây dựng và tiếp nhận góp ý |
| 4 | Giao tiếp bằng văn bản và chọn kênh phù hợp |
| 5 | Làm việc nhóm, thống nhất vai trò và kỳ vọng |
| 6 | Xử lý bất đồng và đàm phán giải pháp |
| 7 | Giao tiếp với stakeholder và tóm tắt quyết định |
| 8 | Bài tập cuối khóa: xử lý bộ tình huống giao tiếp tại nơi làm việc |

### Khóa 34.2: Thuyết trình và kể chuyện bằng dữ liệu

| Bài | Tên bài học |
|---:|---|
| 1 | Xác định thông điệp chính và nhu cầu khán giả |
| 2 | Cấu trúc mở đầu–luận điểm–kết luận |
| 3 | Chọn câu chuyện, ví dụ và bằng chứng |
| 4 | Thiết kế slide có phân cấp thị giác |
| 5 | Trình bày số liệu bằng biểu đồ phù hợp |
| 6 | Luyện giọng, ngôn ngữ cơ thể và quản lý thời gian |
| 7 | Trả lời câu hỏi và xử lý tình huống khó |
| 8 | Dự án cuối khóa: bài thuyết trình 5–7 phút kèm bộ slide |

---

## 35. Năng suất và phát triển cá nhân

**Lĩnh vực chuyên môn liên quan:** Quản lý thời gian, thói quen, mục tiêu, ghi chú, tư duy cá nhân

### Khóa 35.1: Quản lý thời gian và mục tiêu cá nhân

| Bài | Tên bài học |
|---:|---|
| 1 | Đánh giá cách sử dụng thời gian hiện tại |
| 2 | Chọn mục tiêu theo kết quả mong muốn |
| 3 | Chia mục tiêu thành nhiệm vụ và mốc kiểm tra |
| 4 | Ưu tiên công việc và xử lý việc khẩn cấp |
| 5 | Lập lịch tuần, time blocking và khoảng nghỉ |
| 6 | Giảm xao nhãng và xây dựng môi trường tập trung |
| 7 | Rà soát tiến độ, điều chỉnh và duy trì thói quen |
| 8 | Dự án cuối khóa: kế hoạch hành động 30 ngày có thước đo |

### Khóa 35.2: Hệ thống ghi chú và quản lý tri thức cá nhân

| Bài | Tên bài học |
|---:|---|
| 1 | Xác định mục đích của hệ thống ghi chú |
| 2 | Thu thập thông tin và ghi chú chủ động |
| 3 | Tổ chức theo chủ đề, dự án và ngữ cảnh |
| 4 | Liên kết ghi chú và tạo kiến thức có thể tái sử dụng |
| 5 | Quản lý tài liệu, nguồn và bản quyền |
| 6 | Lập kế hoạch ôn tập và biến ghi chú thành hành động |
| 7 | Đánh giá hệ thống và tránh tích trữ thông tin |
| 8 | Dự án cuối khóa: xây dựng kho tri thức cá nhân có cấu trúc |

---

## 36. Tin học văn phòng

**Lĩnh vực chuyên môn liên quan:** Word, Excel, PowerPoint, Google Workspace, bảng tính và tài liệu

### Khóa 36.1: Excel từ cơ bản đến báo cáo

| Bài | Tên bài học |
|---:|---|
| 1 | Giao diện, định dạng dữ liệu và quản lý workbook |
| 2 | Công thức, tham chiếu tương đối và tuyệt đối |
| 3 | Hàm logic, văn bản, ngày tháng và tra cứu |
| 4 | Sắp xếp, lọc, validation và định dạng có điều kiện |
| 5 | PivotTable, biểu đồ và tổng hợp dữ liệu |
| 6 | Power Query nhập và làm sạch dữ liệu |
| 7 | Thiết kế dashboard và kiểm tra lỗi công thức |
| 8 | Dự án cuối khóa: báo cáo quản lý bán hàng từ dữ liệu thô |

### Khóa 36.2: Word và PowerPoint cho tài liệu chuyên nghiệp

| Bài | Tên bài học |
|---:|---|
| 1 | Thiết lập tài liệu, style và cấu trúc heading |
| 2 | Bảng, hình, chú thích, header/footer và mục lục |
| 3 | Review, track changes, comment và kiểm soát phiên bản |
| 4 | Bố cục slide, lưới, typography và tương phản |
| 5 | Chuyển ý phức tạp thành sơ đồ hoặc biểu đồ |
| 6 | Kể chuyện theo logic cho bài thuyết trình |
| 7 | Kiểm tra khả năng đọc, xuất PDF và chuẩn bị trình chiếu |
| 8 | Dự án cuối khóa: bộ báo cáo Word và slide thuyết trình đồng nhất |

---

## 37. Phân tích nghiệp vụ

**Lĩnh vực chuyên môn liên quan:** Business Analysis, yêu cầu, BPMN, UML, stakeholder, user story

### Khóa 37.1: Business Analysis từ yêu cầu đến đặc tả

| Bài | Tên bài học |
|---:|---|
| 1 | Vai trò BA, vòng đời sản phẩm và stakeholder |
| 2 | Kỹ thuật khai thác yêu cầu và đặt câu hỏi |
| 3 | Phân biệt vấn đề, nhu cầu, giải pháp và giả định |
| 4 | Viết user story, acceptance criteria và use case |
| 5 | Ưu tiên yêu cầu và quản lý thay đổi |
| 6 | Lập traceability và xử lý xung đột yêu cầu |
| 7 | Hỗ trợ UAT và xác nhận giải pháp |
| 8 | Dự án cuối khóa: bộ yêu cầu cho một chức năng đặt hàng mẫu |

### Khóa 37.2: Mô hình hóa quy trình với BPMN và UML

| Bài | Tên bài học |
|---:|---|
| 1 | Đọc quy trình hiện tại và đặt ranh giới mô hình |
| 2 | BPMN: event, task, gateway, pool và lane |
| 3 | Mô hình hóa quy trình hiện tại và quy trình đề xuất |
| 4 | Use case diagram và activity diagram |
| 5 | Class diagram, sequence diagram và luồng dữ liệu |
| 6 | Xác thực mô hình với stakeholder và phát hiện ngoại lệ |
| 7 | Viết tài liệu quy trình và tiêu chí nghiệm thu |
| 8 | Dự án cuối khóa: bộ sơ đồ quy trình và đặc tả giải pháp |

---

## 38. Khoa học và Toán học

**Lĩnh vực chuyên môn liên quan:** Toán ứng dụng, logic, đại số, xác suất, thống kê, mô hình hóa

### Khóa 38.1: Toán nền tảng và tư duy giải bài toán

| Bài | Tên bài học |
|---:|---|
| 1 | Số học, tỷ lệ, phần trăm và đơn vị |
| 2 | Đại số, biểu thức và phương trình |
| 3 | Hàm số, đồ thị và cách đọc quan hệ |
| 4 | Hình học, đo lường và tư duy không gian |
| 5 | Logic, tập hợp và suy luận |
| 6 | Bài toán thực tế và mô hình hóa bằng công thức |
| 7 | Kiểm tra kết quả, ước lượng và phát hiện sai số |
| 8 | Dự án cuối khóa: mô hình hóa và giải các bài toán thực tiễn |

### Khóa 38.2: Xác suất và thống kê ứng dụng

| Bài | Tên bài học |
|---:|---|
| 1 | Dữ liệu định tính, định lượng và cách lấy mẫu |
| 2 | Bảng tần số, biểu đồ và thống kê mô tả |
| 3 | Trung bình, trung vị, độ lệch chuẩn và ngoại lệ |
| 4 | Quy tắc xác suất và biến ngẫu nhiên |
| 5 | Phân phối phổ biến và ý nghĩa trực giác |
| 6 | Ước lượng, khoảng tin cậy và kiểm định nhập môn |
| 7 | Tương quan, hồi quy và giới hạn kết luận |
| 8 | Dự án cuối khóa: phân tích bộ dữ liệu và trình bày kết quả có giới hạn |

---

## 39. Kỹ thuật và công nghệ

**Lĩnh vực chuyên môn liên quan:** Điện, điện tử, tự động hóa, CAD/CAM, cơ khí, đo lường

### Khóa 39.1: AutoCAD 2D cho bản vẽ kỹ thuật

| Bài | Tên bài học |
|---:|---|
| 1 | Giao diện, đơn vị và thiết lập bản vẽ |
| 2 | Line, polyline, circle, offset và modify |
| 3 | Layer, màu, nét và quy ước bản vẽ |
| 4 | Dimension, text, leader và annotation |
| 5 | Block, Xref và tái sử dụng thành phần |
| 6 | Layout, viewport, tỷ lệ và in bản vẽ |
| 7 | Kiểm tra kích thước, chuẩn hóa và bàn giao file |
| 8 | Dự án cuối khóa: bộ bản vẽ 2D có lớp, kích thước và khung tên |

### Khóa 39.2: Tự động hóa công nghiệp với PLC nhập môn

| Bài | Tên bài học |
|---:|---|
| 1 | An toàn điện, cảm biến, cơ cấu chấp hành và sơ đồ I/O |
| 2 | PLC, scan cycle và cấu trúc chương trình |
| 3 | Logic ladder, tiếp điểm, cuộn dây và timer |
| 4 | Counter, interlock và chuỗi điều khiển |
| 5 | HMI, cảnh báo và giao diện vận hành |
| 6 | Mô phỏng lỗi, xử lý tín hiệu và debug |
| 7 | Tài liệu hóa và đánh giá an toàn hệ thống |
| 8 | Dự án cuối khóa: mô phỏng dây chuyền điều khiển có chế độ tự động/thủ công |

---

## 40. Khởi nghiệp

**Lĩnh vực chuyên môn liên quan:** Ý tưởng kinh doanh, mô hình kinh doanh, thị trường, MVP, gọi vốn

### Khóa 40.1: Từ ý tưởng đến mô hình kinh doanh

| Bài | Tên bài học |
|---:|---|
| 1 | Xác định vấn đề và nhóm khách hàng gặp vấn đề |
| 2 | Phỏng vấn khách hàng và kiểm chứng giả định |
| 3 | Phân tích thị trường, đối thủ và khác biệt |
| 4 | Value proposition và Business Model Canvas |
| 5 | Thiết kế MVP và thử nghiệm nhỏ |
| 6 | Mô hình doanh thu, chi phí và điểm hòa vốn |
| 7 | Kênh tiếp cận khách hàng và chỉ số tăng trưởng |
| 8 | Dự án cuối khóa: pitch deck và kế hoạch thử nghiệm 90 ngày |

### Khóa 40.2: Xây dựng và phát triển kinh doanh số

| Bài | Tên bài học |
|---:|---|
| 1 | Chọn mô hình kinh doanh số và phân khúc khách hàng |
| 2 | Thiết lập hiện diện trực tuyến và hành trình mua |
| 3 | Thiết kế đề xuất giá trị và gói sản phẩm |
| 4 | Xây dựng hệ thống thu hút và chăm sóc khách hàng |
| 5 | Vận hành, hỗ trợ, hoàn tiền và quản lý chất lượng |
| 6 | Đo unit economics, tỷ lệ chuyển đổi và giữ chân |
| 7 | Quản trị rủi ro, dữ liệu và tăng trưởng bền vững |
| 8 | Dự án cuối khóa: kế hoạch ra mắt sản phẩm số có ngân sách và KPI |

---

## 41. Âm nhạc

**Lĩnh vực chuyên môn liên quan:** Piano, guitar, thanh nhạc, nhạc lý, hòa âm, sản xuất âm nhạc

### Khóa 41.1: Guitar căn bản cho người mới

| Bài | Tên bài học |
|---:|---|
| 1 | Tư thế, cách cầm đàn và bảo dưỡng cơ bản |
| 2 | Đọc tab, nhịp, phách và ký hiệu cơ bản |
| 3 | Lên dây, luyện ngón và chuyển động tay |
| 4 | Hợp âm mở và chuyển hợp âm mượt |
| 5 | Nhịp điệu, strumming và metronome |
| 6 | Hợp âm barre và mẫu tiến trình phổ biến |
| 7 | Đệm hát, nghe nhịp và luyện bài hoàn chỉnh |
| 8 | Bài tổng kết: biểu diễn một bài có intro, verse và chorus |

### Khóa 41.2: Sản xuất âm nhạc tại nhà

| Bài | Tên bài học |
|---:|---|
| 1 | Tín hiệu âm thanh, thiết bị và setup tối thiểu |
| 2 | DAW, track, tempo, MIDI và audio |
| 3 | Thu âm giọng hoặc nhạc cụ sạch |
| 4 | Drum, bass, harmony và arrangement |
| 5 | EQ, compression, reverb và cân bằng mix |
| 6 | Automation, stereo field và kiểm tra tham chiếu |
| 7 | Mastering cơ bản, loudness và xuất file |
| 8 | Dự án cuối khóa: sản xuất một bản nhạc ngắn hoàn chỉnh |

---

## 42. Mỹ thuật và minh họa

**Lĩnh vực chuyên môn liên quan:** Vẽ cơ bản, digital painting, concept art, màu sắc, minh họa sách

### Khóa 42.1: Vẽ căn bản: hình khối, ánh sáng và phối cảnh

| Bài | Tên bài học |
|---:|---|
| 1 | Quan sát hình khối và luyện nét |
| 2 | Tỷ lệ, đo tương quan và dựng hình |
| 3 | Ánh sáng, vùng sáng tối và thể tích |
| 4 | Phối cảnh một điểm và hai điểm tụ |
| 5 | Giải phẫu cơ bản và tỷ lệ cơ thể |
| 6 | Bố cục, điểm nhấn và cân bằng hình |
| 7 | Phác thảo từ tham chiếu và tự đánh giá |
| 8 | Dự án cuối khóa: bộ 3 tranh nghiên cứu hình khối và một tranh hoàn chỉnh |

### Khóa 42.2: Minh họa số và xây dựng phong cách

| Bài | Tên bài học |
|---:|---|
| 1 | Chọn phần mềm, canvas, brush và layer |
| 2 | Phác thảo thumbnail và tìm hình dáng chính |
| 3 | Line art, silhouette và độ rõ hình |
| 4 | Lý thuyết màu và bảng màu giới hạn |
| 5 | Ánh sáng, bóng đổ và vật liệu |
| 6 | Thiết kế nhân vật hoặc minh họa theo brief |
| 7 | Hoàn thiện chi tiết, xuất file và trình bày portfolio |
| 8 | Dự án cuối khóa: một bộ minh họa đồng nhất 3–5 tác phẩm |

---

## 43. Thời trang

**Lĩnh vực chuyên môn liên quan:** Thiết kế trang phục, phối đồ, may mặc, rập, chất liệu, thương hiệu thời trang

### Khóa 43.1: Thiết kế thời trang căn bản

| Bài | Tên bài học |
|---:|---|
| 1 | Nguồn cảm hứng, moodboard và xác định đối tượng |
| 2 | Dáng người, tỷ lệ và vẽ phác thảo trang phục |
| 3 | Chất liệu, độ rủ và đặc tính vải |
| 4 | Màu sắc, họa tiết và phối bộ sưu tập |
| 5 | Chi tiết trang phục, đường may và phụ kiện |
| 6 | Bản vẽ kỹ thuật trước/sau và ghi chú sản phẩm |
| 7 | Tạo mini collection và kiểm tra tính nhất quán |
| 8 | Dự án cuối khóa: bộ sưu tập 3 mẫu kèm moodboard và bản vẽ kỹ thuật |

### Khóa 43.2: May cơ bản và hoàn thiện sản phẩm

| Bài | Tên bài học |
|---:|---|
| 1 | Dụng cụ, máy may và an toàn thao tác |
| 2 | Đo cơ thể và hiểu thông số rập |
| 3 | Đường may cơ bản, đường cong và xử lý mép |
| 4 | Cắt vải, canh sợi và bố trí rập |
| 5 | May túi, khóa kéo và chi tiết hoàn thiện |
| 6 | Lắp ráp sản phẩm đơn giản theo trình tự |
| 7 | Thử đồ, chỉnh sửa lỗi và hoàn thiện |
| 8 | Dự án cuối khóa: may một sản phẩm đơn giản có quy trình và thông số |

---

## 44. Nấu ăn và ẩm thực

**Lĩnh vực chuyên môn liên quan:** Món Việt, kỹ thuật bếp, làm bánh, pha chế, vệ sinh thực phẩm

### Khóa 44.1: Kỹ thuật nấu ăn căn bản

| Bài | Tên bài học |
|---:|---|
| 1 | An toàn dao, vệ sinh và tổ chức khu bếp |
| 2 | Sơ chế, bảo quản nguyên liệu và chống nhiễm chéo |
| 3 | Kỹ thuật luộc, hấp, áp chảo và chiên |
| 4 | Nền vị, nước dùng, gia vị và cân bằng vị |
| 5 | Sơ chế rau, thịt và cách kiểm soát độ chín |
| 6 | Lập thực đơn, định lượng và kiểm soát khẩu phần |
| 7 | Trình bày món và tính giá thành cơ bản |
| 8 | Dự án cuối khóa: hoàn thiện thực đơn 3 món có quy trình và định lượng |

### Khóa 44.2: Làm bánh nhập môn

| Bài | Tên bài học |
|---:|---|
| 1 | Dụng cụ, nguyên liệu, cân đo và nhiệt độ lò |
| 2 | Vai trò bột, đường, trứng, chất béo và chất nở |
| 3 | Kỹ thuật trộn, đánh bông và kiểm soát gluten |
| 4 | Bánh quy và các lỗi kết cấu thường gặp |
| 5 | Bánh bông lan và kiểm soát nhiệt |
| 6 | Kem, nhân và kỹ thuật trang trí cơ bản |
| 7 | Bảo quản, vệ sinh và tính định lượng mẻ bánh |
| 8 | Dự án cuối khóa: làm một set bánh có công thức chuẩn và trình bày thành phẩm |

---

## 45. Sức khỏe và thể chất

**Lĩnh vực chuyên môn liên quan:** Thể hình, yoga, vận động, dinh dưỡng cơ bản, thói quen lành mạnh

### Khóa 45.1: Tập luyện thể lực căn bản an toàn

| Bài | Tên bài học |
|---:|---|
| 1 | Đặt mục tiêu thực tế và đánh giá mức vận động ban đầu |
| 2 | Khởi động, kỹ thuật cơ bản và nguyên tắc an toàn |
| 3 | Mẫu động tác squat, hinge, push, pull và carry |
| 4 | Thiết kế buổi tập toàn thân cho người mới |
| 5 | Tăng dần khối lượng và ghi nhật ký tập luyện |
| 6 | Phục hồi, ngủ, nước và dinh dưỡng nền tảng |
| 7 | Theo dõi tiến bộ và điều chỉnh theo khả năng |
| 8 | Bài tổng kết: kế hoạch tập luyện cá nhân 4 tuần; không thay thế tư vấn y tế |

### Khóa 45.2: Yoga và vận động linh hoạt nhập môn

| Bài | Tên bài học |
|---:|---|
| 1 | Nguyên tắc thở, căn chỉnh và giới hạn cá nhân |
| 2 | Tư thế đứng cơ bản và chuyển trọng lượng |
| 3 | Vận động cột sống, vai và hông nhẹ nhàng |
| 4 | Chuỗi chào mặt trời biến thể phù hợp người mới |
| 5 | Cân bằng, ổn định và phối hợp hơi thở |
| 6 | Thư giãn, phục hồi và nhận biết dấu hiệu quá sức |
| 7 | Thiết kế buổi tập ngắn theo mục tiêu |
| 8 | Bài tổng kết: chuỗi vận động 20 phút phù hợp thể trạng; dừng khi đau bất thường |

---

## 46. Làm đẹp

**Lĩnh vực chuyên môn liên quan:** Chăm sóc da, trang điểm, tạo mẫu tóc, chăm sóc móng, vệ sinh dụng cụ

### Khóa 46.1: Chăm sóc da và xây dựng routine cơ bản

| Bài | Tên bài học |
|---:|---|
| 1 | Cấu trúc da cơ bản và nhận biết loại da ở mức phổ thông |
| 2 | Làm sạch, dưỡng ẩm và chống nắng |
| 3 | Đọc nhãn sản phẩm và giới thiệu hoạt chất phổ biến |
| 4 | Thử sản phẩm an toàn và tránh phối hợp gây kích ứng |
| 5 | Chăm sóc da theo buổi sáng/tối và theo mùa |
| 6 | Vệ sinh dụng cụ, hạn dùng và bảo quản mỹ phẩm |
| 7 | Nhận biết dấu hiệu cần gặp chuyên gia da liễu |
| 8 | Bài tổng kết: xây dựng routine tối giản có theo dõi phản ứng da |

### Khóa 46.2: Trang điểm cá nhân từ cơ bản đến hoàn thiện

| Bài | Tên bài học |
|---:|---|
| 1 | Vệ sinh, dụng cụ và chuẩn bị da |
| 2 | Chọn nền, undertone và độ che phủ |
| 3 | Che khuyết điểm và cố định lớp nền |
| 4 | Tạo chân mày, mắt và chọn màu phù hợp |
| 5 | Má hồng, tạo khối và hoàn thiện tổng thể |
| 6 | Trang điểm ban ngày và chuyển sang buổi tối |
| 7 | Ánh sáng, chụp ảnh và vệ sinh dụng cụ |
| 8 | Dự án cuối khóa: hoàn thiện hai phong cách trang điểm và ghi lại quy trình |

---

## 47. Bất động sản

**Lĩnh vực chuyên môn liên quan:** Môi giới, định giá, đầu tư, marketing dự án, quản lý tài sản

### Khóa 47.1: Kiến thức nền tảng về bất động sản

| Bài | Tên bài học |
|---:|---|
| 1 | Các loại hình bất động sản và bên tham gia thị trường |
| 2 | Đọc thông tin vị trí, quy hoạch và tiện ích |
| 3 | Các giấy tờ pháp lý cần kiểm tra ở mức nhận biết |
| 4 | Giá chào bán, giao dịch tham chiếu và yếu tố ảnh hưởng giá |
| 5 | Dòng tiền, chi phí sở hữu và rủi ro cơ bản |
| 6 | Khảo sát tài sản và ghi nhận dữ liệu thực địa |
| 7 | Đạo đức nghề nghiệp, minh bạch thông tin và thẩm định chuyên môn |
| 8 | Bài tổng kết: lập hồ sơ phân tích một tài sản giả định; không thay thế tư vấn pháp lý/tài chính |

### Khóa 47.2: Marketing và tư vấn khách hàng bất động sản

| Bài | Tên bài học |
|---:|---|
| 1 | Phân loại khách hàng và nhu cầu tìm mua/thuê |
| 2 | Nghiên cứu dự án và chuẩn hóa thông tin sản phẩm |
| 3 | Viết nội dung listing, ảnh và hồ sơ giới thiệu |
| 4 | Tiếp nhận lead, sàng lọc và đặt lịch xem |
| 5 | Tư vấn, xử lý câu hỏi và không cam kết vượt dữ liệu |
| 6 | Theo dõi khách hàng và quản lý pipeline |
| 7 | Đàm phán nguyên tắc và phối hợp hồ sơ giao dịch |
| 8 | Dự án cuối khóa: kế hoạch marketing và quy trình chăm sóc khách hàng cho một listing mẫu |

---

## 48. Pháp luật và tuân thủ

**Lĩnh vực chuyên môn liên quan:** Pháp luật kinh doanh, hợp đồng, sở hữu trí tuệ, quyền riêng tư, tuân thủ

### Khóa 48.1: Pháp luật kinh doanh căn bản cho người đi làm

| Bài | Tên bài học |
|---:|---|
| 1 | Hệ thống văn bản pháp luật và cách tra cứu nguồn chính thống |
| 2 | Chủ thể kinh doanh, thẩm quyền và nghĩa vụ cơ bản |
| 3 | Cấu trúc hợp đồng, điều khoản và bằng chứng giao dịch |
| 4 | Thực hiện, sửa đổi, chấm dứt và lưu trữ hợp đồng |
| 5 | Sở hữu trí tuệ, bản quyền nội dung và giấy phép sử dụng |
| 6 | Rủi ro tuân thủ trong quảng cáo và giao dịch |
| 7 | Khi nào cần chuyển vấn đề cho luật sư/chuyên gia |
| 8 | Bài tổng kết: checklist rà soát hợp đồng mẫu; nội dung mang tính giáo dục, không phải tư vấn pháp lý |

### Khóa 48.2: Quyền riêng tư và bảo vệ dữ liệu trong tổ chức

| Bài | Tên bài học |
|---:|---|
| 1 | Khái niệm dữ liệu cá nhân và vòng đời dữ liệu |
| 2 | Lập bản đồ dữ liệu và xác định mục đích xử lý |
| 3 | Thu thập tối thiểu, thông báo và quản lý đồng ý |
| 4 | Quyền truy cập, lưu trữ, chia sẻ và thời hạn lưu |
| 5 | Nhà cung cấp, chuyển dữ liệu và đánh giá rủi ro |
| 6 | Xử lý yêu cầu chủ thể dữ liệu và sự cố rò rỉ |
| 7 | Đào tạo nhân viên, lưu bằng chứng và kiểm tra định kỳ |
| 8 | Dự án cuối khóa: checklist quản trị dữ liệu cho một quy trình giả lập; cần đối chiếu luật hiện hành |

---

## 49. Nông nghiệp và môi trường

**Lĩnh vực chuyên môn liên quan:** Nông nghiệp công nghệ cao, trồng trọt, thủy canh, đất, nước, bền vững

### Khóa 49.1: Trồng rau tại nhà và chăm sóc cây cơ bản

| Bài | Tên bài học |
|---:|---|
| 1 | Đánh giá không gian, ánh sáng và mục tiêu trồng |
| 2 | Đất trồng, giá thể, chậu và thoát nước |
| 3 | Chọn hạt giống, gieo và chăm cây con |
| 4 | Tưới nước, dinh dưỡng và dấu hiệu thiếu/thừa |
| 5 | Nhận diện sâu bệnh phổ biến và phòng ngừa an toàn |
| 6 | Cắt tỉa, thu hoạch và bảo quản sản phẩm |
| 7 | Lập lịch chăm sóc và ghi nhận kết quả |
| 8 | Dự án cuối khóa: thiết kế vườn rau nhỏ có kế hoạch chăm sóc 4 tuần |

### Khóa 49.2: Thủy canh nhập môn

| Bài | Tên bài học |
|---:|---|
| 1 | Nguyên tắc thủy canh và lựa chọn mô hình phù hợp |
| 2 | Hệ thống nước, bơm, giá thể và ánh sáng |
| 3 | Dung dịch dinh dưỡng, pH và EC ở mức thực hành |
| 4 | Gieo hạt, chuyển cây và quản lý rễ |
| 5 | Kiểm tra tuần hoàn nước và phòng nhiễm bẩn |
| 6 | Nhận biết mất cân bằng dinh dưỡng và điều chỉnh thận trọng |
| 7 | Theo dõi tăng trưởng, thu hoạch và tính chi phí |
| 8 | Dự án cuối khóa: lập kế hoạch một hệ thủy canh quy mô nhỏ có nhật ký theo dõi |

---

## 50. Du lịch và dịch vụ

**Lĩnh vực chuyên môn liên quan:** Quản trị khách sạn, nhà hàng, điều hành tour, hướng dẫn du lịch, chăm sóc khách

### Khóa 50.1: Nghiệp vụ lễ tân khách sạn

| Bài | Tên bài học |
|---:|---|
| 1 | Vai trò lễ tân và hành trình khách lưu trú |
| 2 | Quy trình đặt phòng, xác nhận và quản lý thay đổi |
| 3 | Check-in, xác minh thông tin và bảo mật khách |
| 4 | Tư vấn dịch vụ, giải đáp và phối hợp bộ phận |
| 5 | Xử lý yêu cầu đặc biệt và phàn nàn |
| 6 | Check-out, hóa đơn và bàn giao ca |
| 7 | Tiêu chuẩn giao tiếp, tình huống khẩn cấp và ghi nhận sự cố |
| 8 | Bài tổng kết: mô phỏng hành trình khách từ đặt phòng đến trả phòng |

### Khóa 50.2: Thiết kế tour và điều hành trải nghiệm du lịch

| Bài | Tên bài học |
|---:|---|
| 1 | Nghiên cứu khách mục tiêu và mục đích chuyến đi |
| 2 | Chọn điểm đến, thời gian di chuyển và mùa vụ |
| 3 | Thiết kế lịch trình có khoảng đệm và phương án thay thế |
| 4 | Tính giá tour, chi phí và điều kiện dịch vụ |
| 5 | Làm việc với nhà cung cấp và xác nhận dịch vụ |
| 6 | Truyền đạt thông tin, quản lý đoàn và xử lý thay đổi |
| 7 | Đánh giá rủi ro, an toàn và phản hồi khách |
| 8 | Dự án cuối khóa: hồ sơ tour 2 ngày 1 đêm kèm ngân sách và phương án dự phòng |

---

## Tiêu chuẩn bắt buộc trước khi xuất bản một khóa học

1. Có mục tiêu học tập, đối tượng phù hợp, điều kiện đầu vào và thời lượng dự kiến.
2. Có đủ toàn bộ bài học theo chương trình; không tạo sẵn 5 bài rồi dừng ở đó nếu nội dung cần nhiều hơn.
3. Mỗi bài có video hoặc học liệu riêng, tiêu đề, nội dung, tài liệu, bài tập/thực hành và tiêu chí hoàn thành. Không dùng một video thay cho nhiều bài.
4. Có bài thực hành tổng hợp hoặc dự án cuối khóa; nếu có bài kiểm tra thì ghi rõ điều kiện đạt.
5. Mỗi khóa liên kết với một lĩnh vực chính và các lĩnh vực chuyên môn liên quan; bấm vào các lĩnh vực sẽ mở danh sách khóa học tương ứng.
6. Chỉ cấp chứng chỉ khi người học hoàn thành đúng các điều kiện đã công bố.
7. Các số liệu như học viên, đánh giá, thời lượng và chứng chỉ phải dựa trên dữ liệu thật hoặc được ghi nhãn rõ là nội dung minh họa.
