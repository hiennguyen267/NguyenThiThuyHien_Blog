---
title: "Lập trình mạng Java: Xây dựng ứng dụng Multicast (Truyền tin theo nhóm)"
date: 2025-12-26
type: "posts"
tags: ["Java", "Networking", "Multicast", "UDP"]
summary: "Tìm hiểu về kỹ thuật Multicast - gửi dữ liệu từ một nguồn đến một nhóm người nhận cụ thể. Hướng dẫn sử dụng MulticastSocket trong Java."
---

Trong lập trình mạng, chúng ta thường nghe đến Unicast (1 gửi 1) và Broadcast (1 gửi tất cả). Tuy nhiên, có một kỹ thuật thứ ba rất quan trọng là **Multicast** (1 gửi một nhóm).

Bài viết này sẽ hướng dẫn bạn cách xây dựng chương trình Client/Server kết nối theo dạng Multicast dựa trên tài liệu từ **VnCoder**.

## 1. Multicast là gì?

**Multicast** là phương thức truyền tin mà tại đó, một gói tin được gửi từ một máy nguồn có thể được nhận bởi một **nhóm** các máy đích (đăng ký tham gia nhóm đó), thay vì gửi cho tất cả mọi người như Broadcast.

### Đặc điểm kỹ thuật:
* **Giao thức:** Sử dụng **UDP** (User Datagram Protocol) vì tính chất nhanh và không cần thiết lập kết nối (connectionless).
* **Địa chỉ IP:** Sử dụng dải địa chỉ lớp D (Class D) từ `224.0.0.0` đến `239.255.255.255`.
* **Cơ chế:** Các máy muốn nhận tin phải "tham gia" (`joinGroup`) vào một địa chỉ Multicast cụ thể.



## 2. Lớp `MulticastSocket` trong Java

Để thực hiện Multicast, Java cung cấp lớp `java.net.MulticastSocket`.

Các phương thức quan trọng:
* **`joinGroup(InetAddress mcastaddr)`:** Tham gia vào một nhóm để bắt đầu nhận tin.
* **`leaveGroup(InetAddress mcastaddr)`:** Rời khỏi nhóm, không nhận tin nữa.
* **`send(DatagramPacket p)`:** Gửi gói tin đi (giống như `DatagramSocket` thông thường).
* **`receive(DatagramPacket p)`:** Nhận gói tin về.

## 3. Ví dụ thực tế: Chat nhóm đơn giản

Chúng ta sẽ viết 2 chương trình:
1.  **Sender (Server):** Gửi lời chào đến nhóm.
2.  **Receiver (Client):** Tham gia nhóm và nhận lời chào.

**Cấu hình chung:**
* Địa chỉ nhóm: `224.0.0.1`
* Cổng (Port): `8888`

### 3.1. Code Sender (Người gửi)

Sender không cần phải `joinGroup`, chỉ cần đóng gói dữ liệu và gửi đến địa chỉ IP của nhóm.

```java
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class MulticastSender {
    public static void main(String[] args) {
        try {
            // 1. Địa chỉ Group và Port
            String groupIP = "224.0.0.1";
            int port = 8888;
            String message = "Xin chào các bạn trong nhóm Multicast!";

            // 2. Tạo Socket (Dùng DatagramSocket hoặc MulticastSocket đều được để gửi)
            DatagramSocket socket = new DatagramSocket();
            InetAddress group = InetAddress.getByName(groupIP);

            // 3. Đóng gói dữ liệu
            byte[] buf = message.getBytes();
            DatagramPacket packet = new DatagramPacket(buf, buf.length, group, port);

            // 4. Gửi dữ liệu
            socket.send(packet);
            System.out.println("Đã gửi tin nhắn: " + message);

            // 5. Đóng socket
            socket.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```
### 3.2. Code Receiver (Người nhận)
Receiver bắt buộc phải tạo MulticastSocket và gọi lệnh joinGroup thì mới nhận được tin nhắn.
```java
Java

import java.net.DatagramPacket;
import java.net.InetAddress;
import java.net.MulticastSocket;

public class MulticastReceiver {
    public static void main(String[] args) {
        try {
            // 1. Cấu hình địa chỉ và cổng phải khớp với Sender
            String groupIP = "224.0.0.1";
            int port = 8888;

            // 2. Tạo MulticastSocket lắng nghe tại cổng 8888
            MulticastSocket socket = new MulticastSocket(port);
            InetAddress group = InetAddress.getByName(groupIP);

            // 3. THAM GIA NHÓM (Bước quan trọng nhất)
            socket.joinGroup(group);
            System.out.println("Đã tham gia nhóm " + groupIP + ". Đang chờ tin nhắn...");

            // 4. Nhận dữ liệu
            byte[] buf = new byte[1024];
            DatagramPacket packet = new DatagramPacket(buf, buf.length);
            
            // Hàm receive sẽ treo (block) cho đến khi có tin nhắn đến
            socket.receive(packet);

            // 5. Hiển thị tin nhắn
            String received = new String(packet.getData(), 0, packet.getLength());
            System.out.println("Nhận được: " + received);

            // 6. Rời nhóm và đóng
            socket.leaveGroup(group);
            socket.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```
## 4. Cách chạy chương trình
1. Chạy Receiver trước. Bạn sẽ thấy dòng thông báo "Đang chờ tin nhắn...".

2. Chạy Sender.

3. Quay lại màn hình Receiver, bạn sẽ thấy dòng chữ "Xin chào các bạn trong nhóm Multicast!" xuất hiện.

**Lưu ý:** Bạn có thể chạy nhiều bản Receiver cùng lúc (trên các máy khác nhau trong cùng mạng LAN hoặc nhiều terminal). Khi Sender gửi 1 tin, tất cả Receiver đều sẽ nhận được.

## 5. Kết luận
Multicast là giải pháp tuyệt vời cho các ứng dụng như: họp trực tuyến, dạy học online, update phần mềm đồng loạt, hoặc các ứng dụng stream media. Nó giúp tiết kiệm băng thông mạng đáng kể so với việc gửi riêng lẻ cho từng người.

## Nguồn tham khảo

- **VnCoder – Lập trình Multicast trong Java**  
    https://vncoder.com/java-multicast

- **Oracle Java Documentation – MulticastSocket**  
    https://docs.oracle.com/javase/8/docs/api/java/net/MulticastSocket.html