import java.util.*;

/**
 * 此函数为数独的解决方法
 * 主要思想：
 * 1.通过条件确定数据的方法
 *  （1）获取到每个未填空格的所在的行列和组内已经存在的数字，如果获取到数字总共为8个，则该位置数字就是唯一确定的
 *  （2）如果该数字不是唯一的，则通过两种方法进行确定。
 *      直接比较待选项的唯一性：
 *          按行比较：比较一行中所有未填数字，他们各自可能的结果中，如果有唯一一个数字不在其他可能结果里，即可确定该项
 *          按列比较：同理
 *          按组比较：同理。但是需要注意组的划分
 *      排除后比较待选项的唯一性：
 *          主要用于组内比较：
 *          如果一个组内存在相同的待选项，待选项的个数与相同数一样。则在剩下的不同的待选项组中排除，剩下的项如果唯一则确定。
 *          例如：如果第一组数中有三个数据没有填写。
 *          分别对应a[0][0]待选项为[1,3],a[1][1]待选项为[1,3,7],a[1][2]待选项为[1,3],
 *          则发现具有相同待选项的个数为2个，且分别为1,3,在a[1][1]中去掉1,3后，得到唯一结果为7，因此7就是a[1][1]的结果。
 * 2.尝试法
 *         在经过正常规则确定后，还未得到结果的情况下，使用尝试法。
 */
public class Test2 {
    public static void main(String args[]){
        //        已通过
//        int arr[][] ={
//                {0, 0, 0, 8, 0, 0, 1, 2, 9},
//                {0, 0, 5, 0, 0, 0, 0, 0, 4},
//                {4, 0, 0, 1, 9, 0, 0, 3, 0},
//                {0, 0, 0, 0, 0, 0, 0, 8, 0},
//                {0, 0, 0, 3, 0, 5, 2, 7, 0},
//                {0, 0, 0, 0, 2, 0, 0, 0, 0},
//                {1, 3, 0, 9, 0, 0, 0, 4, 0},
//                {0, 8, 0, 0, 6, 0, 0, 0, 0},
//                {0, 0, 6, 4, 0, 0, 0, 0, 0}
//            };
//        已通过
//        int arr[][] ={
//                {0, 0, 0, 0, 6, 1, 0, 0, 9},
//                {9, 0, 0, 5, 7, 0, 0, 0, 0},
//                {6, 0, 0, 0, 0, 2, 0, 8, 0},
//                {4, 0, 8, 0, 5, 3, 0, 0, 0},
//                {0, 3, 0, 0, 0, 0, 0, 0, 5},
//                {5, 0, 0, 9, 4, 0, 0, 0, 1},
//                {0, 5, 4, 0, 8, 0, 0, 0, 0},
//                {0, 7, 0, 1, 0, 0, 0, 0, 0},
//                {0, 0, 0, 0, 0, 5, 1, 0, 0}
//        };

//        已通过
//        int arr[][] ={
//                {0, 0, 0, 0, 9, 0, 0, 6, 0},
//                {7, 4, 0, 0, 6, 0, 0, 0, 5},
//                {0, 6, 0, 7, 1, 8, 0, 0, 0},
//                {0, 1, 4, 0, 2, 0, 0, 3, 0},
//                {0, 0, 0, 0, 0, 0, 4, 0, 0},
//                {0, 0, 8, 0, 0, 0, 9, 0, 2},
//                {0, 0, 0, 0, 4, 0, 5, 8, 0},
//                {6, 0, 0, 1, 0, 0, 0, 0, 0},
//                {0, 9, 0, 6, 0, 0, 0, 0, 0}
//        };
//        已通过
//        int arr[][] ={
//                {0, 0, 0, 0, 5, 0, 0, 2, 0},
//                {8, 9, 0, 0, 2, 0, 0, 0, 4},
//                {0, 0, 5, 8, 1, 7, 0, 0, 0},
//                {0, 1, 9, 0, 6, 0, 2, 3, 0},
//                {0, 0, 0, 0, 0, 0, 0, 0, 0},
//                {0, 0, 7, 0, 0, 0, 5, 0, 0},
//                {0, 0, 0, 0, 9, 0, 0, 7, 0},
//                {2, 0, 0, 1, 0, 0, 0, 0, 0},
//                {0, 5, 0, 2, 0, 0, 0, 0, 0}
//        };
        //已通过
//        int arr[][] ={
//                {7, 5, 0, 0, 2, 0, 6, 0, 0},
//                {0, 0, 2, 0, 0, 4, 7, 1, 0},
//                {0, 0, 0, 5, 0, 0, 0, 8, 0},
//                {0, 0, 3, 4, 0, 0, 0, 0, 6},
//                {4, 0, 0, 0, 0, 7, 0, 0, 0},
//                {0, 0, 7, 0, 0, 9, 8, 0, 0},
//                {0, 0, 0, 0, 0, 8, 5, 9, 0},
//                {0, 8, 0, 0, 0, 0, 0, 0, 1},
//                {6, 7, 0, 0, 0, 1, 2, 0, 0}
//        };

        //已通过
//        int arr[][] ={
//                {0, 0, 9, 0, 2, 0, 0, 7, 0},
//                {4, 0, 0, 0, 0, 0, 2, 0, 0},
//                {0, 8, 0, 0, 0, 0, 3, 0, 5},
//                {0, 0, 0, 7, 6, 0, 5, 2, 0},
//                {3, 0, 0, 8, 0, 0, 0, 0, 0},
//                {1, 0, 0, 0, 0, 4, 0, 0, 0},
//                {0, 4, 0, 0, 0, 2, 6, 0, 0},
//                {0, 0, 0, 0, 0, 1, 4, 0, 0},
//                {7, 0, 0, 0, 0, 5, 0, 0, 8}
//        };


//        已通过
//        int arr[][] ={
//                {0, 0, 0, 8, 0, 0, 1, 2, 9},
//                {0, 0, 5, 0, 0, 0, 0, 0, 4},
//                {4, 0, 0, 1, 9, 0, 0, 3, 0},
//                {0, 0, 0, 0, 0, 0, 0, 8, 0},
//                {0, 0, 0, 3, 0, 5, 2, 7, 0},
//                {0, 0, 0, 0, 2, 0, 0, 0, 0},
//                {1, 3, 0, 9, 0, 0, 0, 4, 0},
//                {0, 8, 0, 0, 6, 0, 0, 0, 0},
//                {0, 0, 6, 4, 0, 0, 0, 0, 0}
//        };

        //已通过
        int arr[][] ={
                {0, 0, 0, 4, 0, 0, 1, 0, 5},
                {5, 0, 0, 0, 0, 0, 4, 3, 2},
                {0, 9, 4, 1, 0, 0, 0, 8, 0},
                {6, 0, 0, 0, 0, 1, 0, 0, 4},
                {1, 0, 0, 8, 0, 0, 0, 0, 0},
                {0, 8, 0, 0, 0, 4, 9, 0, 0},
                {7, 0, 0, 9, 0, 5, 0, 0, 0},
                {0, 0, 6, 0, 0, 0, 0, 0, 3},
                {0, 0, 0, 0, 0, 0, 0, 6, 0}
        };
        long startTime=System.currentTimeMillis();   //获取开始时间


        int new_arr[][]=count(arr);
        for(int i=0;i<9;i++){
            for(int j=0;j<9;j++){
                System.out.print(new_arr[i][j]+",");
            }
            System.out.println();
        }
        long endTime=System.currentTimeMillis(); //获取结束时间
        System.out.println("程序运行时间： "+(endTime-startTime)+"ms");
    }

    /**
     * 按规则进行查找，尝试法进行查找
     * @param arr
     * @return
     */
    public static int[][] count(int[][] arr){

//        逐层判断数组是否有0，如果有，则返回对应的层数，如果没有则返回-1
        int is_zero=is_zero(arr);
        if(is_zero != -1){
//          如果数组存在0，则开始进行规则推算
            arr=firstCount(arr);
        }
//        如果规则推算后的结果仍然存在0，则使用尝试法
        if(is_zero(arr) !=-1){
            System.out.println("未完成");
            //尝试法
            arr=try_test(arr,is_zero);
            return arr;
        }
        return arr;
    }

    /**
     * 逐层判断数组是否含有0
     * @param arr
     * @return
     */
    public static int is_zero(int[][] arr){
        for(int i=0;i<9;i++){
            for(int j=0;j<9;j++){
                if(arr[i][j]==0){
                    return i;
                }
            }
        }
        return -1;
    }

//    规则推算最多81次，其中只要任何一次已经推算完成，则直接输出
    public static int[][] firstCount(int[][] arr){
        for(int i=0;i<9;i++) {
            for (int n = 0; n < 9; n++) {
                arr = mainCount(n, arr);
                if(is_zero(arr) ==-1){
                    System.out.println("已完成");
                    return arr;
                }
            }


        }
        return arr;
    }



//    逐层计算可能值
    public static int[][] mainCount(int index,int[][] arr){
        String[] str=new String[1];
        StringBuffer sb=new StringBuffer();
        StringBuffer sb_index=new StringBuffer();
        StringBuffer sb_index_y=new StringBuffer();

//        按行进行比较
        for(int i=0;i<9;i++){
            again:
            if(arr[index][i]==0){
                List list_str=countCommon(index,i,arr);
                String quChong=list_str.toString();

                if(list_str.size()==9){
                    return arr;
                }else if(list_str.size()==8){
                    arr[index][i]=searchNum(list_str);
                    sb=new StringBuffer();
                    sb_index=new StringBuffer();
                    break again;
                }else{
                    sb.append(quChong+",");
                    sb_index.append(i+",");
                }
            }
        }
        //对比这几组数据是否有唯一的值
        arr=compareUnit(index,sb,sb_index,arr,"heng",sb_index_y);


        StringBuffer sb1=new StringBuffer();
        StringBuffer sb_index1=new StringBuffer();
        StringBuffer sb_index_y1=new StringBuffer();
//        按列进行比较
        for(int i=0;i<9;i++){
            haha:
            if(arr[i][index]==0){
//                对这三个数组进行合并去重
                List list_str=countCommon(i,index,arr);

                String quChong=list_str.toString();


                if(list_str.size()==9){
                    return arr;
                }else if(list_str.size()==8){
                        //说明该位置值唯一，只需要获取到该值即
                        arr[i][index]=searchNum(list_str);
                        sb1=new StringBuffer();
                        sb_index1=new StringBuffer();
                        break haha;
                }else{
                    sb1.append(quChong+",");
                    sb_index1.append(i+",");
                }
            }
        }
        //对比这几组数据是否有唯一的值
        arr=compareUnit(index,sb1,sb_index1,arr,"zhong",sb_index_y1);

//        对组内的数字进行比较
        arr=compareZu(arr);

        return arr;
    }
    public static int[][] try_test(int[][] arr,int n){
        int[][] arr_tem=copyArray(arr);
            for (int i = n; i < 9; i++) {
                for (int j = 0; j < 9; j++) {

                    if (arr_tem[i][j] == 0) {
                        //获取到可能出现的结果
                        List list1 = countCommon(i, j, arr_tem);
                        List<Integer> list2 = canWrite(list1);
                        for (int q = 0; q < list2.size(); q++) {
                            System.out.println("arr["+i+"]["+j+"]="+list2.get(q));
                            arr_tem[i][j] = list2.get(q);
                            arr_tem = firstCount(arr_tem);
                            if (is_zero(arr_tem) == -1) {
//                                arr = copyArray(arr);
                                System.out.println("成功！");
                                return arr_tem;
                            }else{
                                arr_tem=copyArray(arr);
                            }
                        }
                    }
                }
            }
        return arr;
    }

    public static int[][] copyArray(int[][] a){
        int[][] b=new int[a.length][a.length];
        for(int i=0;i<a.length;i++){
            for(int j=0;j<a.length;j++){
                b[i][j]=a[i][j];
            }
        }
        return b;
    }

    /**
     * 求出横竖组内的数字
     * @param a
     * @param b
     * @param arr
     * @return
     */
    public static List<String> countCommon(int a,int b,int[][] arr){
        String[] rowResult = countRowNum(a, arr);
        //计算该位置竖排有几个除0以外的数字
        String[] columsResult = countColumsNum(b, arr);
        //计算该位置所在区域除0以外的数字
        String[] countZoneNum = countZoneNum(a, b, arr);
        //   对这三个数组进行合并去重
        List<String> list_str=quChong(rowResult,columsResult,countZoneNum);
        return list_str;
    }

    public static int[][] compareZu(int[][] arr){
        for(int v=0;v<9;v++){
            for(int u=0;u<9;u++){
                if(v<3){
                    if(u<3){
                        arr=allCount(0,0,arr,0,"middle");
                    }else if(u>5){
                        arr=allCount(0,6,arr,0,"middle");
                    }else{
                        arr=allCount(0,3,arr,0,"middle");
                    }
                }else if(v>5){
                    if(u<3){
                        arr=allCount(6,0,arr,0,"middle");
                    }else if(u>5){
                        arr=allCount(6,6,arr,0,"middle");
                    }else{
                        arr=allCount(6,3,arr,0,"middle");
                    }
                }else{
                    if(u<3){
                        arr=allCount(3,0,arr,0,"middle");
                    }else if(u>5){
                        arr=allCount(3,6,arr,0,"middle");
                    }else{
                        arr=allCount(3,3,arr,0,"middle");
                    }
                }
            }
        }
        return arr;
    }

    public static int[][] allCount(int x,int y,int[][] arr,int index,String str){
        List handle_list=new ArrayList();
        StringBuffer sb2=new StringBuffer();
        StringBuffer sb_index2=new StringBuffer();
        StringBuffer sb_index_y2=new StringBuffer();
        yaya:
        for(int q=x;q<x+3;q++){
            for(int w=y;w<y+3;w++) {
                if (arr[q][w] == 0) {
//                对这三个数组进行合并去重
                    List list_str=countCommon(q,w,arr);
                    String quChong=list_str.toString();
//                    System.out.println("String结果为："+quChong);

//                    取得该数字可能填写的数值
                    List<Integer> list_new_str=canWrite(list_str);
                    if(list_str.size()==9){
                        return arr;
                    }else if(list_str.size()==8){
                        //说明该位置值唯一，只需要获取到该值即可
                        arr[q][w]=searchNum(list_str);
                        sb2=new StringBuffer();
                        sb_index2=new StringBuffer();
                        sb_index_y2=new StringBuffer();
                        handle_list=new ArrayList();
                        break yaya;
                    }else{
                        sb2.append(quChong + ",");
                        sb_index2.append(q + ",");
                        sb_index_y2.append(w + ",");
                        handle_list.add(list_new_str.toString());
                    }
                }
            }
        }
        arr=compareUnit(index,sb2,sb_index2,arr,str,sb_index_y2);
        arr=finalHandleData(sb_index2,sb_index_y2,arr,handle_list);

        return arr;
    }

    //通过比较待选项是否相同，以及排除后得到结果
    public static int[][] finalHandleData(StringBuffer a,StringBuffer b,int[][] arr,List<String> list){
        String[] str=new String[list.size()];
        String[] new_a=a.toString().split(",");
        String[] new_b=b.toString().split(",");
        StringBuffer sb=new StringBuffer();
        StringBuffer sd=new StringBuffer();
        for(int i=0;i<str.length;i++) {
            str[i]=handleString(handleString(list.get(i)));
        }
        for(int e=0;e<str.length;e++){
            int count=1;
            boolean flag=false;
            for(int r=e;r<str.length;r++){
                if(str[e].equals(str[r]) && e !=r){
                    count++;
                    flag=true;
                }
            }
            if(count == str[e].length() && flag==true){
                //确认重复的项
                sb.append(str[e]+",");
            }
        }
        String[] str1=sb.toString().split(",");
        for(int h=0;h<str1.length;h++) {
            for (int t = 0; t < str.length; t++) {
                String str_num=str[t].replace(str1[h],"");
                if (str_num.length() ==1){
                    int numX = Integer.parseInt(new_a[t]);
                    int numY = Integer.parseInt(new_b[t]);
                    arr[numX][numY]=Integer.parseInt(str_num);
                }
            }
        }
        return arr;
    }

    public static String handleString(String str){
        String[] str_arr=str.split("\\[|\\]|,");
        StringBuffer sb=new StringBuffer();
        for(int i=0;i<str_arr.length;i++){
            if(!str_arr[i].equals("") || !!str_arr[i].equals(" ")) {
                sb.append(str_arr[i].trim());
            }
        }
        return sb.toString();
    }

    //计算一行已经有的数字
    public static String[] countRowNum(int row, int[][] arr){
        StringBuffer sb =new StringBuffer();
        for(int i=0;i<arr[row].length;i++){
            if(arr[row][i] !=0){
                sb.append(arr[row][i]+",");
            }
        }
        String[] new_arr=sb.toString().split(",");
        return new_arr;
    }

    //计算一列已经有的数字
    public static String[] countColumsNum(int colums, int[][] arr){
        StringBuffer sb =new StringBuffer();
        for(int i=0;i<arr.length;i++){
            if(arr[i][colums]!=0){
                sb.append(arr[i][colums]+",");
            }
        }
        String[] new_arr=sb.toString().split(",");
//        System.out.println("new_arr="+new_arr);
        return new_arr;
    }

    //计算组里有的数字
    public static String[] countZoneNum(int row,int colums,int[][] arr){
        if(row<3){
            if(colums<3){
               return countZoneNum_tmp(0,0,arr);
            }else if(colums>5){
                return countZoneNum_tmp(0,6,arr);
            }else{
               return countZoneNum_tmp(0,3,arr);
            }
        }else if(row>5){
            if(colums<3){
                return countZoneNum_tmp(6,0,arr);
            }else if(colums>5){
                return countZoneNum_tmp(6,6,arr);
            }else{
                return countZoneNum_tmp(6,3,arr);
            }
        }else{
            if(colums<3){
                return countZoneNum_tmp(3,0,arr);
            }else if(colums>5){
                return countZoneNum_tmp(3,6,arr);
            }else{
                return countZoneNum_tmp(3,3,arr);
            }
        }
    }

    public static String[] countZoneNum_tmp(int row,int colums,int[][] arr){
        StringBuffer sb =new StringBuffer();
        for(int i=row;i<row+3;i++){
            for(int j=colums;j<colums+3;j++){
                if(arr[i][j] !=0){
                    sb.append(arr[i][j]+",");
                }
            }
        }
        String[] new_arr=sb.toString().split(",");
//        System.out.println("new_arr="+new_arr);
        return new_arr;
    }

//    对获取到的三组数据进行合并和去重
    public static List quChong(String[] a,String[] b, String[] c){
        Set<String> demo=new HashSet<String>();

        String[] d=new String[a.length+b.length+c.length];
        System.arraycopy(a,0,d,0,a.length);
        System.arraycopy(b,0,d,a.length,b.length);
        System.arraycopy(c,0,d,a.length+b.length,c.length);
        for(int i=0;i<d.length;i++){
            if(!d[i].equals("")&&!d[i].equals(" ")) {
                demo.add(d[i]);
            }
        }
        List<String> list=new ArrayList<String>(demo);
        Collections.sort(list);
//        System.out.println(list.toString());
        return list;
    }


//    查找该值
    public static int searchNum(List s){
        for(int i=1;i<=9;i++){
                if(s.indexOf(""+i)==-1){
                    return i;
            }
        }
        return -1;
    }

    //获取该数的可能值
    public static List<Integer> canWrite(List s){
        List list=new ArrayList<String>();
        for(int i=1;i<=9;i++){
            if(s.indexOf(""+i)==-1){
               list.add(i);
            }
        }
        //排序
        Collections.sort(list);
        return list;
    }

//    比较给定的元素的某个值是不是只出现一次，如果只出现一次，则可以记录
    public static int[][] compareUnit(int index,StringBuffer a,StringBuffer b, int[][] arr,String type,StringBuffer sb){

        String[] new_a=a.toString().split("\\[|,|\\]");
        String[] new_b=b.toString().split(",");
        String[] new_y=sb.toString().split(",");
        for(int i=1;i<10;i++){
            int count=0;
            for(int j=0;j<new_a.length;j++){
                if(new_a[j].indexOf(""+i) != -1){
                    count++;
                }
            }
            if(count==new_b.length-1){
                String[] new_c=a.toString().split("\\],");
                for(int x=0;x<new_c.length;x++) {
                    String[] new_d = new_c[x].split("\\[|,");
                    int new_count = 0;
                    for (int y = 0; y < new_d.length; y++) {
                        if (new_d[y].indexOf("" + i) != -1) {
                            new_count++;
                        }
                    }
                    if (new_count == 0) {
                        if(!b.toString().equals("")) {
                            int num = Integer.parseInt(new_b[x]);
                            if (type.equals("heng")) {
                                arr[index][num] = i;
                            } else if(type.equals("zhong")){
                                arr[num][index] = i;
                            }else {
                                if(!sb.toString().equals("")) {
                                    int num_y = Integer.parseInt(new_y[x]);;
                                    arr[num][num_y]=i;
                                }
                            }
                        }

                    }
                }
            }
        }
        return arr;
    }

}
