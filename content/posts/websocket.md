---
title: "Tổng quan về Lập trình mạng trong Java (Java Networking)"
date: 2025-12-26
type: "posts"
tags: ["Java", "Networking", "Socket", "TCP/IP"]
summary: "Khám phá sức mạnh của gói thư viện java.net. Hướng dẫn cơ bản về Socket, URL và cách xây dựng ứng dụng Client-Server đơn giản."
---

Java là một ngôn ngữ mạnh mẽ không chỉ cho các ứng dụng doanh nghiệp mà còn cho lập trình mạng. Ngay từ những phiên bản đầu tiên, Java đã cung cấp gói thư viện `java.net` với đầy đủ các tính năng để giao tiếp qua mạng Internet.

Bài viết này sẽ tổng hợp các kiến thức cơ bản về lập trình mạng trong Java dựa trên tài liệu từ **VietJack**.

## 1. Lập trình mạng là gì?

Lập trình mạng (Network Programming) là việc viết các chương trình cho phép các thiết bị máy tính giao tiếp với nhau thông qua mạng (như mạng LAN hoặc Internet).

Trong Java, lập trình mạng thường xoay quanh hai giao thức vận chuyển chính:
* **TCP (Transmission Control Protocol):** Giao thức hướng kết nối, đảm bảo độ tin cậy cao. Dữ liệu gửi đi được đảm bảo đến nơi và đúng thứ tự (Ví dụ: Web, Email).
* **UDP (User Datagram Protocol):** Giao thức không hướng kết nối, ưu tiên tốc độ nhưng không đảm bảo dữ liệu đến nơi an toàn (Ví dụ: Streaming video, Game online).



## 2. Các lớp quan trọng trong `java.net`

Gói `java.net` cung cấp một loạt các lớp (Classes) và giao diện (Interfaces) để xử lý các chi tiết cấp thấp của giao tiếp mạng.

### 2.1. InetAddress
Lớp này đại diện cho một địa chỉ IP (Internet Protocol). Nó không có constructor công khai mà sử dụng các phương thức tĩnh để khởi tạo.

```java
InetAddress ip = InetAddress.getByName("[www.google.com](https://www.google.com)");
System.out.println("Host Name: " + ip.getHostName());
System.out.println("IP Address: " + ip.getHostAddress());
```
### 2.2. URL (Uniform Resource Locator)
Lớp URL đại diện cho một tài nguyên trên World Wide Web (ví dụ: một trang web hoặc một file ảnh). Bạn có thể dùng nó để tải nội dung từ một trang web.

### 2.3. Socket và ServerSocket (Dành cho TCP)
Đây là hai lớp quan trọng nhất để xây dựng ứng dụng Client-Server.

**Socket:** Đại diện cho phía Client (người gửi yêu cầu).

**ServerSocket:** Đại diện cho phía Server (người lắng nghe yêu cầu).

### 2.4. DatagramSocket và DatagramPacket (Dành cho UDP)
Dùng để gửi và nhận các gói tin rời rạc mà không cần thiết lập kết nối lâu dài.

## 3. Ví dụ: Ứng dụng Chat đơn giản (TCP Socket)
Mô hình Socket trong Java hoạt động dựa trên luồng (Stream) Input/Output để gửi và nhận dữ liệu.

**Server (Máy chủ)**  
Server sẽ mở cổng 6666 và chờ đợi Client kết nối.
```java
import java.io.*;
import java.net.*;

public class MyServer {
    public static void main(String[] args) {
        try {
            // 1. Mở cổng 6666
            ServerSocket ss = new ServerSocket(6666);
            System.out.println("Server đang lắng nghe...");

            // 2. Chấp nhận kết nối (Blocking)
            Socket s = ss.accept(); 

            // 3. Nhận dữ liệu từ Client
            DataInputStream dis = new DataInputStream(s.getInputStream());
            String str = (String) dis.readUTF();
            
            System.out.println("Client gửi: " + str);

            // 4. Đóng kết nối
            ss.close();
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
```
**Client (Máy khách)**  
Client sẽ kết nối đến Server (localhost) tại cổng 6666 và gửi một dòng tin nhắn.
```java
import java.io.*;
import java.net.*;

public class MyClient {
    public static void main(String[] args) {
        try {
            // 1. Kết nối đến Server
            Socket s = new Socket("localhost", 6666);

            // 2. Gửi dữ liệu đi
            DataOutputStream dos = new DataOutputStream(s.getOutputStream());
            dos.writeUTF("Xin chào Server, mình là Client!");
            
            // 3. Đóng kết nối
            dos.flush();
            dos.close();
            s.close();
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
```
## 4. Kết luận
Lập trình mạng trong Java rất mạnh mẽ và linh hoạt. Với gói java.net, bạn có thể dễ dàng xây dựng từ các ứng dụng chat đơn giản đến các hệ thống web server phức tạp.

Để đi sâu hơn, bạn cần tìm hiểu thêm về NIO (Non-blocking I/O) trong Java để xử lý hàng ngàn kết nối đồng thời mà không bị nghẽn.

## Nguồn tham khảo

- **VietJack – Lập trình mạng trong Java**  
  [https://vietjack.com/java/java_networking.shtml](https://vietjack.com/java/java_networking.shtml)

- **Oracle Java Documentation – java.net Package**  
  [https://docs.oracle.com/javase/8/docs/api/java/net/package-summary.html](https://docs.oracle.com/javase/8/docs/api/java/net/package-summary.html)
