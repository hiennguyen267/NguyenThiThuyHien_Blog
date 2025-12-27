---
title: "Thiết lập SSL/TLS cho Spring Boot: Hướng dẫn cài đặt HTTPS từ A-Z"
date: 2025-12-26
type: "posts"
tags: ["Java", "Spring Boot", "SSL", "HTTPS", "Security"]
summary: "Hướng dẫn kích hoạt giao thức HTTPS bảo mật cho ứng dụng Spring Boot. Cách tạo Keystore với Keytool và cấu hình application.properties."
---

Trong môi trường Production, việc chạy ứng dụng Web trên giao thức HTTP là rất thiếu an toàn vì dữ liệu truyền đi không được mã hóa. **SSL/TLS (HTTPS)** là tiêu chuẩn bắt buộc để bảo vệ dữ liệu người dùng.

Bài viết này sẽ hướng dẫn bạn cách thiết lập SSL cho Spring Boot sử dụng chứng chỉ tự ký (Self-signed Certificate) để chạy test dưới local.

## 1. Chuẩn bị: Tạo Keystore

Để chạy HTTPS, chúng ta cần một "chứng minh thư" số gọi là Certificate. Trong Java, chứng chỉ này thường được lưu trong một file gọi là **Keystore** (`.p12` hoặc `.jks`).

Chúng ta sẽ dùng công cụ `keytool` (có sẵn trong bộ JDK) để tạo một chứng chỉ tự ký.

Mở CMD (hoặc Terminal) và chạy lệnh sau:

```bash
keytool -genkeypair -alias stackjava -keyalg RSA -keysize 2048 -storetype PKCS12 -keystore spring-ssl-test.p12 -validity 3650
```
**Giải thích:**

- **alias stackjava:** Tên định danh cho chứng chỉ.

- **keyalg RSA:** Thuật toán mã hóa RSA.

- **storetype PKCS12:** Định dạng file keystore (chuẩn mới là PKCS12, cũ là JKS).

- **keystore spring-ssl-test.p12:** Tên file keystore sẽ được tạo ra.

- **validity 3650:** Thời hạn có hiệu lực (3650 ngày ~ 10 năm).

Sau khi chạy, bạn sẽ được yêu cầu nhập mật khẩu (ví dụ: 123456) và điền các thông tin (Tên, Tổ chức...). Bạn có thể điền đại khái hoặc Enter để bỏ qua, nhưng nhớ kỹ mật khẩu.

Sau bước này, bạn sẽ có file spring-ssl-test.p12. Hãy copy file này vào thư mục src/main/resources của project Spring Boot.

## 2. Cấu hình Spring Boot
Mở file application.properties và thêm các dòng cấu hình sau để kích hoạt SSL:


**Cổng chạy ứng dụng (thường HTTPS chạy port 8443 hoặc 443)**
```bash
server.port=8443
```
**Kích hoạt SSL**
```bash
server.ssl.enabled=true
```
**Đường dẫn tới file Keystore (nằm trong thư mục resources)**
```bash
server.ssl.key-store=classpath:spring-ssl-test.p12
```
**Mật khẩu bạn đã đặt ở bước 1**
```bash
server.ssl.key-store-password=123456
```
**Loại Keystore (PKCS12)**
```bash
server.ssl.key-store-type=PKCS12
```
**Alias đã đặt ở bước 1**
```bash
server.ssl.key-alias=stackjava
```
## 3. Viết API kiểm thử
Tạo một Controller đơn giản để test xem HTTPS có hoạt động không.

```Java
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloSslController {

    @GetMapping("/hello")
    public String hello() {
        return "Xin chào! Bạn đang truy cập qua giao thức HTTPS an toàn.";
    }
}
```
## 4. Chạy và Kiểm tra
Khởi động ứng dụng Spring Boot của bạn. Sau đó mở trình duyệt và truy cập:
```
https://localhost:8443/hello
``` 
**Lưu ý:** Vì đây là chứng chỉ tự ký (Self-signed) nên trình duyệt sẽ cảnh báo "Kết nối không riêng tư" (Not Secure). Điều này hoàn toàn bình thường ở local.

**Trên Chrome:** Bấm Nâng cao (Advanced) -> Tiếp tục truy cập localhost (Proceed to localhost).

Nếu bạn thấy dòng chữ "Xin chào! Bạn đang truy cập qua giao thức HTTPS an toàn." thì chúc mừng, bạn đã cấu hình thành công!

## 5. Chuyển hướng HTTP sang HTTPS (Nâng cao)
Thông thường, chúng ta muốn người dùng dù gõ http:// thì cũng tự động chuyển sang https://. Để làm điều này trong Spring Boot, bạn cần cấu hình thêm một TomcatServletWebServerFactory để mở thêm một cổng HTTP (ví dụ 8080) và redirect nó sang cổng HTTPS (8443).

## 6. Kết luận
- Việc cài đặt HTTPS cho Spring Boot khá đơn giản nhờ sự hỗ trợ tận răng của file cấu hình.

- Với môi trường Local: Dùng keytool tạo chứng chỉ tự ký.

- Với môi trường Production: Bạn nên mua chứng chỉ từ các tổ chức uy tín (CA) hoặc dùng Let's Encrypt, sau đó cấu hình tương tự vào file .p12.

## Nguồn tham khảo

- **StackJava – Cài đặt SSL/TLS cho Spring Boot**  
  https://stackjava.com/spring-boot/https-ssl

- **Spring Boot Official Documentation – SSL Configuration**  
  https://docs.spring.io/spring-boot/docs/current/reference/html/web.html#web.server.ssl
