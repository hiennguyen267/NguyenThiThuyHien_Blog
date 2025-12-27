---
title: "Java RMI: Gọi phương thức từ xa (Remote Method Invocation) là gì?"
date: 2025-12-26
type: "posts"
tags: ["Java", "RMI", "Distributed System", "Networking"]
summary: "Tìm hiểu về Java RMI - công nghệ cho phép một máy ảo Java (JVM) gọi phương thức của một đối tượng đang chạy trên một máy ảo Java khác."
---

Trong lập trình hệ thống phân tán (Distributed Systems), việc giao tiếp giữa các máy tính là cốt lõi. Chúng ta thường nghe đến REST API hay Socket. Tuy nhiên, trong thế giới thuần Java, có một công nghệ cực kỳ mạnh mẽ giúp việc giao tiếp giữa các server trở nên trong suốt như đang gọi hàm nội bộ: đó là **Java RMI**.

Hôm nay, mình sẽ giới thiệu về Java RMI và cách triển khai một ứng dụng Calculator đơn giản.

## 1. Java RMI là gì?

**RMI (Remote Method Invocation)** là cơ chế cho phép một đối tượng đang chạy trên máy ảo Java này (Client) có thể gọi các phương thức của một đối tượng đang chạy trên máy ảo Java khác (Server).



Hãy tưởng tượng: Bạn đang code ở máy A, bạn gọi hàm `tinhTong(1, 2)`. Nhưng thực tế, phép tính `1 + 2` lại được thực hiện CPU của máy B, sau đó máy B trả kết quả về cho máy A. Đó chính là RMI.

## 2. Các thành phần cốt lõi

Để RMI hoạt động, nó dựa trên kiến trúc Stub/Skeleton:

1.  **Remote Interface:** Một Interface chung quy định các hàm mà Server sẽ cung cấp và Client có thể gọi.
2.  **Remote Object (Server):** Đối tượng thực sự cài đặt các xử lý logic (Implementation).
3.  **Stub (Client-side):** Một "đại diện" giả mạo của đối tượng Server nằm ở phía Client. Khi Client gọi hàm, nó gọi vào Stub. Stub sẽ đóng gói dữ liệu và gửi qua mạng.
4.  **RMI Registry:** Cuốn "danh bạ" điện thoại. Server đăng ký tên của object vào đây, Client tra cứu tên để tìm địa chỉ object.

## 3. Ví dụ thực tế: Ứng dụng Calculator

Chúng ta sẽ xây dựng một ứng dụng tính toán đơn giản gồm 2 máy: Client gửi số, Server tính toán và trả về kết quả.

### Bước 1: Tạo Remote Interface

Interface này phải kế thừa từ `java.rmi.Remote` và các phương thức phải ném ra ngoại lệ `RemoteException`.

```java
import java.rmi.Remote;
import java.rmi.RemoteException;

// Interface chung cho cả Client và Server
public interface CalculatorService extends Remote {
    int add(int a, int b) throws RemoteException;
    int subtract(int a, int b) throws RemoteException;
}
```
### Bước 2: Cài đặt logic trên Server (Implementation)
Class này sẽ thực thi logic thực tế. Nó thường kế thừa UnicastRemoteObject để RMI có thể export object này ra mạng.
```java
Java

import java.rmi.server.UnicastRemoteObject;
import java.rmi.RemoteException;

public class CalculatorServiceImpl extends UnicastRemoteObject implements CalculatorService {

    // Constructor bắt buộc phải throw RemoteException
    protected CalculatorServiceImpl() throws RemoteException {
        super();
    }

    @Override
    public int add(int a, int b) throws RemoteException {
        System.out.println("Server đang tính tổng: " + a + " + " + b);
        return a + b;
    }

    @Override
    public int subtract(int a, int b) throws RemoteException {
        return a - b;
    }
}
```
### Bước 3: Tạo Server và Đăng ký lên Registry
Server sẽ khởi tạo object và gắn nó vào một cái tên (ví dụ: "Calculator") trên cổng mặc định 1099.
```java
Java

import java.rmi.Naming;
import java.rmi.registry.LocateRegistry;

public class RmiServer {
    public static void main(String[] args) {
        try {
            // 1. Tạo thanh ghi RMI ở cổng 1099
            LocateRegistry.createRegistry(1099);

            // 2. Khởi tạo đối tượng
            CalculatorService service = new CalculatorServiceImpl();

            // 3. Đăng ký tên định danh cho đối tượng
            Naming.rebind("rmi://localhost:1099/Calculator", service);

            System.out.println("Server đã sẵn sàng!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```
### Bước 4: Tạo Client để gọi hàm
Client sẽ tìm kiếm object tên là "Calculator" và gọi hàm như thể object đó đang nằm ngay trên máy mình.
```java
Java

import java.rmi.Naming;

public class RmiClient {
    public static void main(String[] args) {
        try {
            // 1. Tìm kiếm đối tượng trên Server qua tên "Calculator"
            CalculatorService service = (CalculatorService) Naming.lookup("rmi://localhost:1099/Calculator");

            // 2. Gọi phương thức từ xa
            int result = service.add(10, 20);
            
            System.out.println("Kết quả trả về từ Server: " + result);
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```
## 4. Ưu và nhược điểm
**Ưu điểm**
- Dễ sử dụng: Cú pháp giống hệt gọi hàm Java thông thường.

- Type-safe: Đảm bảo an toàn kiểu dữ liệu vì dùng chung Interface Java.

- Tích hợp sâu: Hỗ trợ truyền Object phức tạp (thông qua Serialization).

**Nhược điểm**
- Chỉ dành cho Java: Cả Client và Server đều phải viết bằng Java. Nếu muốn đa ngôn ngữ, bạn nên dùng REST API hoặc gRPC.

- Chậm hơn Socket: Do mất chi phí đóng gói (Marshalling) và giải nén (Unmarshalling) đối tượng.

- Cấu hình mạng: Đôi khi gặp rắc rối với Firewall khi triển khai thực tế.

## 5. Kết luận
Java RMI là một công nghệ nền tảng tuyệt vời để hiểu về cách các hệ thống phân tán hoạt động. Mặc dù ngày nay Microservices và REST API phổ biến hơn, nhưng RMI vẫn được sử dụng trong nhiều hệ thống nội bộ doanh nghiệp nhờ sự chặt chẽ và an toàn của nó.

## Nguồn tham khảo

- **Oracle Java Documentation – Java RMI**  
  https://docs.oracle.com/javase/8/docs/technotes/guides/rmi/

- **Oracle Java SE – Remote Method Invocation (RMI)**  
  https://docs.oracle.com/javase/tutorial/rmi/

- **GeeksforGeeks – Java RMI**  
  https://www.geeksforgeeks.org/java-rmi/

- **TutorialsPoint – Java RMI**  
  https://www.tutorialspoint.com/java_rmi/index.htm

- **IBM Documentation – Java RMI Concepts**  
  https://www.ibm.com/docs/en/sdk-java-technology/8?topic=concepts-java-rmi
