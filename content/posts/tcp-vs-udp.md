---
title: "TCP vs UDP: So sánh hai giao thức truyền tải cốt lõi của Internet"
date: 2025-12-26
type: "posts"
tags: ["Networking", "TCP", "UDP", "Protocol", "Network Layer"]
summary: "Phân biệt chi tiết giữa TCP và UDP. Khi nào nên ưu tiên tốc độ (UDP) và khi nào cần sự tin cậy tuyệt đối (TCP)? Tổng hợp từ Vietnix."
---

Trong thế giới mạng máy tính, mọi dữ liệu di chuyển từ máy này sang máy khác đều phải tuân theo các quy tắc gọi là **Giao thức (Protocol)**. Ở tầng Giao vận (Transport Layer), hai "gã khổng lồ" phổ biến nhất chính là **TCP** và **UDP**.

Hiểu rõ sự khác biệt giữa chúng là kiến thức bắt buộc để thiết kế ứng dụng mạng hiệu quả. Bài viết này dựa trên thông tin từ **Vietnix** sẽ giúp bạn phân biệt chúng.



## 1. TCP (Transmission Control Protocol) là gì?

**TCP** (Giao thức điều khiển truyền vận) là giao thức hướng kết nối (connection-oriented). Điểm đặc trưng nhất của TCP là sự **tin cậy**.

### Đặc điểm nổi bật:
* **Bắt tay 3 bước (Three-way Handshake):** Trước khi gửi dữ liệu, TCP buộc hai máy phải thiết lập kết nối với nhau (SYN - SYN/ACK - ACK).
* **Đảm bảo toàn vẹn:** TCP đảm bảo dữ liệu gửi đi không bị mất, không bị lỗi và đến đúng thứ tự. Nếu gói tin bị mất, TCP sẽ yêu cầu gửi lại (Retransmission).
* **Kiểm soát luồng (Flow Control):** Điều chỉnh tốc độ gửi dữ liệu để tránh làm quá tải người nhận.

### Ứng dụng thực tế:
Do tính chất "chậm mà chắc", TCP được dùng cho:
* Duyệt Web (HTTP/HTTPS).
* Gửi nhận Email (SMTP, IMAP/POP).
* Truyền tải file (FTP).

## 2. UDP (User Datagram Protocol) là gì?

**UDP** (Giao thức gói dữ liệu người dùng) là giao thức phi kết nối (connectionless). Điểm đặc trưng của UDP là **tốc độ**.

### Đặc điểm nổi bật:
* **Không kết nối:** Gửi là gửi thôi, không cần "bắt tay" hay chào hỏi gì cả.
* **Gửi và quên (Fire and Forget):** UDP không quan tâm gói tin có đến nơi hay không, cũng không quan tâm thứ tự. Gói tin đến trước có thể được xử lý trước hoặc sau gói tin đến muộn.
* **Nhẹ và nhanh:** Do bỏ qua các bước kiểm tra lỗi và thiết lập kết nối, UDP có header nhỏ hơn và tốc độ truyền tải nhanh hơn TCP rất nhiều.

### Ứng dụng thực tế:
Do tính chất "nhanh nhưng ẩu", UDP phù hợp với các ứng dụng chấp nhận mất một chút dữ liệu nhưng cần thời gian thực (Real-time):
* Streaming Video/Audio (YouTube, Netflix, Spotify).
* Game Online (FPS, MOBA).
* Voice over IP (VoIP - Gọi điện qua mạng như Zoom, Skype).
* Hệ thống phân giải tên miền (DNS).

## 3. Bảng so sánh TCP và UDP

Dưới đây là bảng tổng hợp sự khác biệt chính dựa trên tài liệu từ Vietnix:

| Tiêu chí | TCP (Transmission Control Protocol) | UDP (User Datagram Protocol) |
| :--- | :--- | :--- |
| **Loại kết nối** | Hướng kết nối (Connection-oriented). | Phi kết nối (Connectionless). |
| **Độ tin cậy** | Cao. Đảm bảo dữ liệu đến nơi đầy đủ. | Thấp. Không đảm bảo dữ liệu đến nơi. |
| **Thứ tự** | Sắp xếp lại đúng thứ tự gửi. | Không quan tâm thứ tự. |
| **Tốc độ** | Chậm hơn (do phải kiểm tra lỗi, bắt tay). | Nhanh hơn. |
| **Header Size** | Lớn (20 bytes). | Nhỏ (8 bytes). |
| **Cơ chế gửi lại** | Có (nếu mất gói tin). | Không. |

## 4. Khi nào nên dùng loại nào?

Câu trả lời phụ thuộc vào yêu cầu của ứng dụng bạn đang viết:

* **Chọn TCP khi:** Bạn cần độ chính xác tuyệt đối. Ví dụ: Khi tải một file `.exe` hay gửi một tin nhắn văn bản, bạn không muốn mất dù chỉ 1 byte dữ liệu.
* **Chọn UDP khi:** Bạn cần tốc độ và độ trễ thấp (Low latency). Ví dụ: Khi xem Livestream, nếu mạng lag, bạn thà bị nhòe hình (mất gói tin) trong 1 giây rồi xem tiếp, còn hơn là video dừng hẳn lại để chờ tải lại gói tin bị mất đó.

## 5. Kết luận

TCP và UDP không có cái nào "tốt hơn" cái nào, chúng sinh ra để giải quyết các bài toán khác nhau của Internet.
* **TCP** là người vận chuyển cẩn thận, tỉ mỉ.
* **UDP** là người vận chuyển siêu tốc, phóng khoáng.

Là một lập trình viên Backend/Network, việc lựa chọn đúng giao thức sẽ quyết định hiệu năng ứng dụng của bạn.

## Nguồn tham khảo

- **Vietnix – TCP vs UDP: Phân biệt các giao thức truyền tải Internet**  
  https://vietnix.vn/tcp-vs-udp

- **Oracle Java Documentation – TCP/IP Protocols**  
  https://docs.oracle.com/javase/8/docs/api/java/net/package-summary.html
