---
title: "Đa luồng (Multithreading) trong Java: Hướng dẫn cơ bản từ VietJack"
date: 2025-12-26
type: "posts"
tags: ["Java", "Multithreading", "Concurrency", "Performance"]
summary: "Tìm hiểu về Multithreading trong Java: Khái niệm, Vòng đời của một Thread và cách tạo luồng xử lý song song để tối ưu hóa hiệu năng ứng dụng."
---

Trong lập trình Java, **Multithreading (Đa luồng)** là một kỹ thuật cho phép CPU thực hiện nhiều tác vụ cùng một lúc. Nó giúp tận dụng tối đa sức mạnh của bộ vi xử lý và làm cho ứng dụng phản hồi nhanh hơn, đặc biệt là trong các game hay ứng dụng xử lý dữ liệu lớn.

Bài viết này sẽ tóm tắt các kiến thức cốt lõi về Đa luồng dựa trên tài liệu từ **VietJack**.

## 1. Đa luồng là gì?

Đa luồng trong Java là quá trình thực thi nhiều luồng (thread) đồng thời. Một **Thread** là một đơn vị xử lý nhỏ nhất trong chương trình.
* **Đa nhiệm (Multitasking):** Là chạy nhiều tiến trình (process) cùng lúc (ví dụ: vừa nghe nhạc vừa code).
* **Đa luồng (Multithreading):** Là chạy nhiều luồng trong cùng một tiến trình (ví dụ: trong trình nghe nhạc, một luồng phát nhạc, một luồng tải bài hát tiếp theo).



## 2. Vòng đời của một Thread (Thread Life Cycle)

Một Thread trong Java sẽ trải qua 5 trạng thái chính trong vòng đời của nó:



1.  **New (Mới):** Luồng vừa được khởi tạo nhưng chưa chạy (chưa gọi hàm `start()`).
2.  **Runnable (Có thể chạy):** Luồng đã sẵn sàng và đang đợi CPU cấp phát tài nguyên để chạy.
3.  **Running (Đang chạy):** CPU đang thực thi các mã lệnh trong luồng.
4.  **Blocked/Waiting (Bị chặn/Đợi):** Luồng tạm dừng để đợi tài nguyên (I/O) hoặc đợi một luồng khác.
5.  **Terminated/Dead (Kết thúc):** Luồng hoàn thành công việc hoặc bị tắt đột ngột.

## 3. Cách tạo Thread trong Java

Có 2 cách chính để tạo một luồng trong Java.

**Cách 1: Kế thừa lớp `Thread`**  
Bạn tạo một class kế thừa từ `Thread` và ghi đè phương thức `run()`.

```java
class MyThread extends Thread {
    public void run() {
        System.out.println("Luồng đang chạy...");
    }

    public static void main(String args[]) {
        MyThread t1 = new MyThread();
        t1.start(); // Bắt đầu luồng
    }
}
```

**Cách 2: Thực thi interface Runnable**  
Cách này linh hoạt hơn vì Java hỗ trợ đa thực thi (implement nhiều interface) nhưng chỉ cho phép đơn kế thừa.Javaclass MyRunnable
```java
 implements Runnable {
    public void run() {
        System.out.println("Luồng Runnable đang chạy...");
    }

    public static void main(String args[]) {
        MyRunnable myRunnable = new MyRunnable();
        Thread t1 = new Thread(myRunnable);
        t1.start();
    }
}
```
## 4. Các phương thức quan trọng
Lớp Thread cung cấp nhiều phương thức để điều khiển luồng:
| Phương thức | Mô tả |
|------------|-------|
| `start()` | Bắt đầu thực thi luồng (gọi hàm `run()` bên trong). |
| `run()` | Chứa code thực thi chính của luồng. |
| `sleep(long millis)` | Tạm dừng luồng trong một khoảng thời gian (tính bằng mili giây). |
| `join()` | Đợi luồng này kết thúc rồi mới tiếp tục chạy luồng khác. |
| `getPriority()` | Lấy mức độ ưu tiên của luồng. |
| `setPriority(int)` | Thiết lập độ ưu tiên của luồng (`MIN_PRIORITY = 1`, `MAX_PRIORITY = 10`). |
## 5. Ví dụ: 
Sử dụng sleep()Dưới đây là ví dụ cho hai luồng chạy song song và tạm dừng xen kẽ nhau:
```java
Javaclass TestSleep extends Thread {
    public void run() {
        for (int i = 1; i <= 3; i++) {
            try {
                Thread.sleep(500); // Ngủ 500ms
            } catch (InterruptedException e) {
                System.out.println(e);
            }
            System.out.println(i);
        }
    }

    public static void main(String args[]) {
        TestSleep t1 = new TestSleep();
        TestSleep t2 = new TestSleep();

        t1.start();
        t2.start();
    }
}
```
## 6.Kết quả: 
Bạn sẽ thấy các số 1, 1, 2, 2, 3, 3 hiện ra lần lượt do hai luồng chạy đua với nhau.6. Kết luậnMultithreading là một vũ khí mạnh mẽ nhưng cũng dễ gây lỗi (như Deadlock, Race Condition) nếu không quản lý tốt. Hiểu rõ vòng đời và cách tạo Thread là bước đầu tiên để bạn chinh phục các ứng dụng Java hiệu năng cao.

## Nguồn tham khảo

- **VietJack – Java Multithreading**  
  https://vietjack.com/java/java_multithreading.jsp

- **VietJack – Java Thread Class**  
  https://vietjack.com/java/java_thread_class.jsp

- **Oracle Java Documentation – Concurrency**  
  https://docs.oracle.com/javase/tutorial/essential/concurrency/

- **Oracle Java API – Thread Class**  
  https://docs.oracle.com/en/java/javase/8/docs/api/java/lang/Thread.html
